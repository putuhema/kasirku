import { Products } from "@/interfaces/products.interface";
import { ProductService } from "@/services/products.service";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";

export class ProductController {
  public products = Container.get(ProductService);

  public getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productData: Products[] = await this.products.findAllProduct();
      res.status(200).json({
        data: productData,
        message: "getAllProducts",
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllProductsPage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { category, name, price, search } = req.query;
      const page = Number(req.params.id);
      const productData: Products[] = await this.products.findAllProductPage(
        page,
        Number(category),
        String(name),
        String(price),
        String(search)
      );
      res.status(200).json({
        data: productData,
        message: "getAllProducts",
      });
    } catch (error) {
      next(error);
    }
  };

  public findProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productId = Number(req.params.id);
      const product: Products = await this.products.findProduct(productId);

      res.status(200).json({
        data: product,
        message: "findProduct",
      });
    } catch (err) {
      next(err);
    }
  };

  public postProductImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { productId } = req.body;
      const { path } = req.file as Express.Multer.File;

      console.log({ productId, path });
      await this.products.postProductImage(path, Number(productId));
      res.status(200).json({
        message: "postProductImage",
      });
    } catch (err) {
      next(err);
    }
  };

  public createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { products } = req.body;
      const parseProducts: Products = JSON.parse(products);
      const { path } = req.file as Express.Multer.File;
      const productData: Products = await this.products.createProduct({
        ...parseProducts,
        imgUrl: path,
        categoryId: parseProducts.categoryId,
      });

      res.status(200).json({
        data: productData,
        message: "createProduct",
      });
    } catch (error) {
      next(error);
    }
  };

  public changeProductStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productId = Number(req.params.id);
      const updatedProduct: Products = await this.products.changeStatus(
        productId
      );

      res.status(200).json({
        data: updatedProduct,
        message: "statusChange",
      });
    } catch (err) {
      next(err);
    }
  };

  public editProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productId = Number(req.params.id);
      const { status, name, price, stock, categoryId, description } = req.body;

      const updatedProduct = await this.products.editProduct(productId, {
        name,
        price,
        stock,
        categoryId,
        description,
        status,
      });

      res.status(200).json({
        data: updatedProduct,
        message: "updatedProduct",
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productId = Number(req.params.id);
      const deletedProduct = await this.products.deleteProduct(productId);
      res.status(200).json({
        data: deletedProduct,
        message: "deleteProduct",
      });
    } catch (error) {
      next(error);
    }
  };
}
