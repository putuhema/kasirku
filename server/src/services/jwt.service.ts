import { REFRESH_KEY, SECRET_KEY } from "@/config";
import { DataStoredInToken, TokenData } from "@/interfaces/auth.interface";
import * as jwt from "jsonwebtoken";
import { Service } from "typedi";

interface refreshTokenPayload {
  id: string;
  iat: number;
  exp: number;
}

@Service()
export class JwtService {
  generateToken(payload: DataStoredInToken) {
    return jwt.sign(payload, SECRET_KEY, {
      expiresIn: "8h",
    });
  }

  generateRefreshToken(payload: { id: number }) {
    return jwt.sign(payload, REFRESH_KEY, {
      expiresIn: "7d",
    });
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      throw new Error("Invalid Token");
    }
  }

  verifyRefreshToken(token: string) {
    try {
      return jwt.verify(token, REFRESH_KEY) as refreshTokenPayload;
    } catch (error) {
      throw new Error("Invalid Token");
    }
  }
}
