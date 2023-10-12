import { User } from "@/interfaces/users.interface";
import { UserService } from "@/services/users.service";
import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";

export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.user.findAllUser();

      res.status(200).json({
        data: findAllUsersData,
        message: "findAll",
      });
    } catch (err) {
      next(err);
    }
  };
}
