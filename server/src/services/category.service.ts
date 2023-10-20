import { DB } from "@/database";
import { HttpException } from "@/exceptions/HttpException";
import { Category } from "@/interfaces/category.interface";
import { Service } from "typedi";

@Service()
export class CategoryService {
  public async getAllCategory(): Promise<Category[]> {
    const findAllCategory: Category[] = await DB.Category.findAll();

    return findAllCategory;
  }

  public async createCategory(category: string) {
    const findCategory: Category = await DB.Category.findOne({
      where: { name: category },
    });

    if (findCategory) throw new HttpException(400, "Duplicate Category");
    const newCategory = await DB.Category.create({
      name: category,
    });

    return newCategory;
  }

  public async deleteCategory(categoryId: number) {
    const findCategory = await DB.Category.findByPk(categoryId);
    if (!findCategory) throw new HttpException(409, "No Category with that ID");

    await DB.Category.destroy({
      where: {
        id: categoryId,
      },
    });

    return findCategory;
  }

  public async editCategory(categoryId: number, name: string) {
    const findCategory = await DB.Category.findByPk(categoryId);
    if (!findCategory) throw new HttpException(409, "No Category with that ID");

    await DB.Category.update(
      {
        name,
      },
      { where: { id: categoryId } }
    );
    const updatedCategory = await DB.Category.findByPk(categoryId);
    return updatedCategory;
  }
}
