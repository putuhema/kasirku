import { UserController } from "@/controllers/users.controller";
import { Routes } from "@/interfaces/routes.interface";
import { AuthMiddleware, IsAdmin } from "@/middleware/auth.middleware";
import { ValidationMiddleware } from "@/middleware/validation.middleware";
import { upload } from "@/services/upload.service";
import { Router } from "express";
import { body } from "express-validator";

export class UserRoute implements Routes {
  public path = "/users";
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getUsers);
    this.router.get(
      `${this.path}/:id(\\d+)`,
      AuthMiddleware,
      this.user.getUser
    );
    this.router.get(`${this.path}/settings/:id(\\d+)`, this.user.getUser);

    this.router.post(
      `${this.path}`,
      AuthMiddleware,
      IsAdmin,
      this.user.postUser
    );
    this.router.post(
      `${this.path}/profile`,
      upload.single("profile"),
      this.user.postProfilePict
    );
    this.router.post(`${this.path}/delete/:id(\\d+)`, this.user.deleteUser);
    this.router.post(`${this.path}/settings/:id(\\d+)`, this.user.userSettings);
    this.router.post(`${this.path}/:id(\\d+)`, this.user.updateUser);
    this.router.post(
      `${this.path}/status/:id(\\d+)`,
      this.user.changeUserStatus
    );
    this.router.post(
      `${this.path}/check-password/:id(\\d+)`,
      this.user.checkPassword
    );
    this.router.post(
      `${this.path}/change-password/:id(\\d+)`,
      ValidationMiddleware([body("password").isLength({ min: 8 })]),
      this.user.changePassword
    );
  }
}
