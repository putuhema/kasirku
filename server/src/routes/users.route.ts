import { UserController } from "@/controllers/users.controller";
import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";

export class UserRoute implements Routes {
  public path = "/users";
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getUsers);
  }
}
