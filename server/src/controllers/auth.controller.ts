import { REFRESH_KEY, SECRET_KEY } from "@/config";
import { DB } from "@/database";
import { CreateUserDto } from "@/dtos/users.dto";
import { HttpException } from "@/exceptions/HttpException";
import {
  DataStoredInToken,
  RequestWithUser,
} from "@/interfaces/auth.interface";
import { User } from "@/interfaces/users.interface";
import { AuthService } from "@/services/auth.service";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Container } from "typedi";

export class AuthController {
  public auth = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signupUserData: User = await this.auth.signup(userData);

      res.status(201).json({
        data: signupUserData,
        message: "signup",
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const { accessToken, user } = await this.auth.login(userData);
      res.status(200).json({ accessToken, user });
    } catch (error) {
      next(error);
    }
  };

  public verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      const verifiedToken = this.auth.verifyToken(token);

      res.status(200).json(verifiedToken);
    } catch (error) {
      next(error);
    }
  };

  public logout = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.auth.logout(userData);

      res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
      res.status(200).json({ data: logOutUserData, message: "logout" });
    } catch (error) {
      next(error);
    }
  };

  public resetPasswordRequest = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;
      console.log(email);
      const service = await this.auth.requestResetPassword(email);
      res.json(service);
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token, userId, password } = req.body;
      const service = await this.auth.resetPassword(
        userId as number,
        token,
        password
      );
      res.status(200).json(service);
    } catch (error) {
      next(error);
    }
  };
}
