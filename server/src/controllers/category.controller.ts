import { Category } from "@/interfaces/category.interface";
import { CategoryService } from "@/services/category.service";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";

export class CategoryController {
  public category = Container.get(CategoryService);

  public getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findCategories: Category[] = await this.category.getAllCategory();
      res.status(200).json({
        data: findCategories,
        message: "findAllCategories",
      });
    } catch (error) {
      next(error);
    }
  };

  public createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { category } = req.body;
      const newCategory = await this.category.createCategory(category);
      res.status(200).json({
        data: newCategory,
        message: "createCategory",
      });
    } catch (error) {
      next(error);
    }
  };

  public editCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const name = String(req.body.name);
      const id = Number(req.params.id);
      const updatedCategory = await this.category.editCategory(id, name);

      res.status(200).json({
        data: updatedCategory,
        message: "editCategory",
      });
    } catch (err) {
      next(err);
    }
  };

  public deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categoryId = Number(req.params.id);
      const deletedCategory = await this.category.deleteCategory(categoryId);
      res.status(200).json({
        data: deletedCategory,
        message: "deleteCategory",
      });
    } catch (error) {
      next(error);
    }
  };
}
