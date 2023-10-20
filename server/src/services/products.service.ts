import { DB } from "@/database";
import { CreateProductDto, EditProductDto } from "@/dtos/product.dto";
import { HttpException } from "@/exceptions/HttpException";
import { Products } from "@/interfaces/products.interface";
import { deleteImage } from "@/utils/file";
import { Op } from "sequelize";
import { Service } from "typedi";

type ProductStatus = "active" | "disabled" | "deleted";
@Service()
export class ProductService {
  public async findAllProduct(): Promise<Products[]> {
    const allProducts: Products[] = await DB.Products.findAll({
      where: {
        status: {
          [Op.in]: ["active", "disabled"],
        },
      },
      include: DB.Category,
    });
    return allProducts;
  }

  public async findAllProductPage(
    page: number,
    categoryId: number,
    name: string,
    price: string,
    search: string
  ): Promise<Products[]> {
    const productPerPage = 10;
    const offset = (page - 1) * productPerPage;

    const conditions: any = {
      offset,
      limit: productPerPage,
      include: DB.Category,
      where: {
        status: "active",
      },
    };
    if (!!price && !!name) {
      conditions.order = [
        ["price", price],
        ["name", name],
      ];
    } else if (!!price) {
      conditions.order = [["price", price]];
    } else if (!!name) {
      conditions.order = [["name", name]];
    }

    if (categoryId) {
      conditions.where[Op.and] = [{ categoryId }];
    }

    if (!!search) {
      conditions.where.name = {
        [Op.like]: `%${search}%`,
      };
    }

    const allProducts: Products[] = await DB.Products.findAll(conditions);
    return allProducts;
  }

  public async createProduct(product: CreateProductDto): Promise<Products> {
    const createProductData: Products = await DB.Products.create({
      ...product,
      status: "active",
      categoryId: product.categoryId,
    });

    return createProductData;
  }

  public async editProduct(
    productId: number,
    product: EditProductDto
  ): Promise<Products> {
    const findProduct = await DB.Products.findByPk(productId);
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    await DB.Products.update(
      {
        ...product,
        status: product.status as ProductStatus,
      },
      { where: { id: productId } }
    );

    const updatedProduct = await DB.Products.findByPk(productId);
    return updatedProduct;
  }

  public async findProduct(productId: number) {
    const findProduct = await DB.Products.findByPk(productId);
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    return findProduct;
  }

  public async postProductImage(imgUrl: string, productId: number) {
    const findProduct = await DB.Products.findByPk(productId);
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    await deleteImage(findProduct.imgUrl);
    await DB.Products.update(
      {
        imgUrl,
      },
      { where: { id: productId } }
    );
  }

  public async changeStatus(productId: number) {
    const findProduct = await DB.Products.findByPk(productId);
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    const status = findProduct.status == "active" ? "disabled" : "active";
    await DB.Products.update(
      {
        status: status,
      },
      { where: { id: productId } }
    );

    const updatedUser: Products = await DB.Products.findByPk(productId);
    return updatedUser;
  }

  public async deleteProduct(productId: number) {
    const findProduct = await DB.Products.findByPk(productId);
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    await deleteImage(findProduct.imgUrl);
    await DB.Products.update(
      {
        status: "deleted",
      },
      {
        where: {
          id: productId,
        },
      }
    );

    return findProduct;
  }
}
