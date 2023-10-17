import {
  DataStoredInToken,
  RequestWithUser,
} from "@/interfaces/auth.interface";
import { verify } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { SECRET_KEY } from "@/config";
import { DB } from "@/database";
import { HttpException } from "@/exceptions/HttpException";

const getAuthorization = (req: RequestWithUser) => {
  const cookie = req.cookies["Authorization"];
  if (cookie) return cookie;

  const header = req.header("Authorization");
  if (header) return header.split("Bearer ")[1];

  return null;
};

export const AuthMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const { id } = verify(Authorization, SECRET_KEY) as DataStoredInToken;
      const findUser = await DB.Users.findByPk(id);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, "Wrong authentication token"));
      }
    } else {
      next(new HttpException(404, "Authentication token missing"));
    }
  } catch (error) {
    next(new HttpException(401, "Wrong authentication token"));
  }
};

export const IsAdmin = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role === "admin") {
      return next();
    }

    next(new HttpException(401, "Unauthorized"));
  } catch (error) {
    next(error);
  }
};