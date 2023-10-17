import { Request } from "express";
import { User } from "./users.interface";

export interface DataStoredInToken {
  id: number;
  role: string;
}

export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
