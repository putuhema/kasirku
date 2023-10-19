import { ProductController } from "@/controllers/products.controller";
import { Routes } from "@/interfaces/routes.interface";
import { upload } from "@/services/upload.service";
import { Router } from "express";

export class ProductRoute implements Routes {
  public path = "/products";
  public router = Router();
  public product = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.product.getAllProducts);
    this.router.get(
      `${this.path}/page/:id(\\d+)`,
      this.product.getAllProductsPage
    );
    this.router.get(`${this.path}/:id(\\d+)`, this.product.findProduct);
    this.router.post(
      `${this.path}/image`,
      upload.single("profile"),
      this.product.postProductImage
    );
    this.router.post(
      `${this.path}/status/:id(\\d+)`,
      this.product.changeProductStatus
    );
    this.router.post(`${this.path}/edit/:id(\\d+)`, this.product.editProduct);
    this.router.post(
      `${this.path}`,
      upload.single("image"),
      this.product.createProduct
    );
    this.router.post(
      `${this.path}/delete/:id(\\d+)`,
      this.product.deleteProduct
    );
  }
}
