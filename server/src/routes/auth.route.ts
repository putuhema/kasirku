import { AuthController } from "@/controllers/auth.controller";
import { Routes } from "@/interfaces/routes.interface";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { ValidationMiddleware } from "@/middleware/validation.middleware";
import { Router } from "express";
import { body } from "express-validator";

export class AuthRoute implements Routes {
  public path = "/auth";
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/signup`,
      ValidationMiddleware([
        body("email").isEmail(),
        body("password").isLength({ min: 8 }),
      ]),
      this.auth.signUp
    );
    this.router.post(`${this.path}/login`, this.auth.login);
    this.router.post(`${this.path}/logout`, AuthMiddleware, this.auth.logout);
    this.router.post(
      `${this.path}/req-reset-pwd`,
      this.auth.resetPasswordRequest
    );
    this.router.post(
      `${this.path}/reset-password`,
      ValidationMiddleware([body("password").isLength({ min: 8 })]),
      this.auth.resetPassword
    );
    this.router.get(`${this.path}/verify`, this.auth.verifyToken);
  }
}
