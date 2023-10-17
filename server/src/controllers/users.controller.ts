import { User } from "@/interfaces/users.interface";
import { UserService } from "@/services/users.service";
import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";

export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = String(req.query.role);
      const findAllUsersData: User[] = await this.user.findAllUser(role);

      res.status(200).json({
        data: findAllUsersData,
        message: "findAll",
      });
    } catch (err) {
      next(err);
    }
  };

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const findUser: User = await this.user.findUser(Number(id));
      res.status(200).json({
        data: findUser,
        message: "findUser",
      });
    } catch (err) {
      next(err);
    }
  };

  public postUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, username, email, role, phone, password } = req.body;
      const user = await this.user.createUser({
        name,
        email,
        role,
        phone,
        password,
        username,
        imgUrl: "",
        status: "active",
      });

      res.status(200).json({
        data: user,
        message: "postUser",
      });
    } catch (err) {
      next(err);
    }
  };

  public userSettings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, username, email, phone } = req.body;
      console.log({ name, username, email, phone });
      const userId = Number(req.params.id);
      const user = await this.user.userSettings(userId, {
        name,
        email,
        phone,
        username,
      });

      res.status(200).json({
        data: user,
        message: "userSettings",
      });
    } catch (err) {
      next(err);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = Number(req.params.id);
      const { name, username, email, role, status, phone, imgUrl, password } =
        req.body;
      const user = await this.user.updateUser(userId, {
        name,
        email,
        role,
        phone,
        password,
        username,
        imgUrl,
        status,
      });

      res.status(200).json({
        data: user,
        message: "updateUser",
      });
    } catch (err) {
      next(err);
    }
  };

  public changeUserStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = Number(req.params.id);
      const updatedUser: User = await this.user.changeStatus(userId);

      res.status(200).json({
        data: updatedUser,
        message: "statusChange",
      });
    } catch (err) {
      next(err);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.user.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public postProfilePict = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.body;
      const { path } = req.file as Express.Multer.File;
      await this.user.postProfile(path, Number(userId));
      res.status(200).json({
        message: "postProfile",
      });
    } catch (err) {
      next(err);
    }
  };

  public checkPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = Number(req.params.id);
      const { password } = req.body;
      console.log(req.body);
      const isMatch: boolean = await this.user.checkPassword(
        userId,
        String(password)
      );

      res.status(200).json({
        message: "checkPassword",
        isMatch,
      });
    } catch (err) {
      next(err);
    }
  };
  public changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = Number(req.params.id);
      const { password } = req.body;
      const updatedUser: User = await this.user.changePassword(
        userId,
        String(password)
      );

      res.status(200).json({
        Data: updatedUser,
        message: "checkPassword",
      });
    } catch (err) {
      next(err);
    }
  };
}
