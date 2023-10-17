import { DB } from "@/database";
import { CreateUserDto } from "@/dtos/users.dto";
import { HttpException } from "@/exceptions/HttpException";
import { User } from "@/interfaces/users.interface";
import { compare, hash } from "bcrypt";
import Container, { Service } from "typedi";
import { JwtService } from "./jwt.service";
import { randomBytes } from "crypto";
import sendEmail from "@/utils/email/sendEmail";
import { JwtPayload } from "jsonwebtoken";

type Role = "cashier" | "admin";

@Service()
export class AuthService {
  public jwt = Container.get(JwtService);

  public async signup(userData: CreateUserDto): Promise<User> {
    const findUser: User = await DB.Users.findOne({
      where: { email: userData.email },
    });
    if (findUser)
      throw new HttpException(
        409,
        `This Email ${userData.email} already exists`
      );

    const findFirstUser: User = await DB.Users.findOne({ where: { id: 1 } });
    const assignRole: Role = !findFirstUser ? "admin" : "cashier";

    const hashPassword = await hash(userData.password, 10);
    const createUserData: User = await DB.Users.create({
      ...userData,
      status: "active",
      imgUrl: "uploads/default.jpg",
      role: assignRole,
      password: hashPassword,
    });

    return createUserData;
  }

  public async login(
    userData
  ): Promise<{ accessToken: string; user: { id: number; role: string } }> {
    const findUser: User = await DB.Users.findOne({
      where: { username: userData.username },
    });
    if (!findUser)
      throw new HttpException(
        404,
        `User with username @${userData.username} was not found`
      );

    if (findUser.status !== "active") {
      throw new HttpException(401, `This User is being deactivated.`);
    }

    const isPasswordMatching: boolean = await compare(
      userData.password,
      findUser.password
    );

    if (!isPasswordMatching) throw new HttpException(409, "Wrong Password");

    const accessToken = this.jwt.generateToken({
      id: findUser.id,
      role: findUser.role,
    });

    return { accessToken, user: { id: findUser.id, role: findUser.role } };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await DB.Users.findOne({
      where: { username: userData.username, password: userData.password },
    });

    return findUser;
  }

  public verifyToken(token: string): string | JwtPayload {
    if (!token) {
      throw new Error("Bad Request");
    }

    const tokenString = token.split(" ")[1];
    let verifiedToken = this.jwt.verifyToken(tokenString);

    if (!verifiedToken) {
      throw new HttpException(401, "Unauthorize");
    }

    return verifiedToken;
  }

  public async requestResetPassword(email: string) {
    console.log(email);
    const findUser = await DB.Users.findOne({ where: { email: email } });
    if (!findUser) throw new HttpException(401, "Email Not Exist");

    let token = await DB.Token.findOne({ where: { userId: findUser.id } });
    if (token) await token.destroy();

    let resetToken = randomBytes(32).toString("hex");
    const hashResetToken = await hash(resetToken, 10);

    await DB.Token.create({
      userId: findUser.id,
      token: hashResetToken,
    });

    const link = `localhost:5173/reset-password?token=${resetToken}&id=${findUser.id}`;

    sendEmail(
      findUser.email,
      "Password Reset Request",
      {
        name: findUser.name,
        link: link,
      },
      "./template/reqResetPassword.handlebars"
    );
    return { link };
  }

  public async resetPassword(userId: number, token: string, password: string) {
    const findToken = await DB.Token.findOne({ where: { userId: userId } });
    console.log(findToken);
    if (!findToken) {
      throw new Error("Invalid or Expired password reset token");
    }
    const isValid = await compare(token, findToken.token);
    if (!isValid) {
      throw new Error("Invalid or Expired password reset token");
    }
    const hashPassword = await hash(password, 10);
    await DB.Users.update(
      {
        password: hashPassword,
      },
      { where: { id: userId } }
    );

    const findUser = await DB.Users.findOne({ where: { id: userId } });
    sendEmail(
      findUser.email,
      "Password Reset Successfully",
      {
        name: findUser.name,
      },
      "./template/resetPassword.handlebars"
    );
    await findToken.destroy();
    return { message: "Password reset was successful" };
  }
}
