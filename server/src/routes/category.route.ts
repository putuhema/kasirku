import { CategoryController } from "@/controllers/category.controller";
import { Routes } from "@/interfaces/routes.interface";
import { AuthMiddleware, IsAdmin } from "@/middleware/auth.middleware";
import { Router } from "express";

export class CategoryRoute implements Routes {
  public path = "/category";
  public router = Router();
  public category = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.category.getAllCategories);
    this.router.post(`${this.path}`, this.category.createCategory);
    this.router.post(
      `${this.path}/delete/:id(\\d+)`,
      AuthMiddleware,
      IsAdmin,
      this.category.deleteCategory
    );
    this.router.post(
      `${this.path}/edit/:id(\\d+)`,
      AuthMiddleware,
      IsAdmin,
      this.category.editCategory
    );
  }
}
