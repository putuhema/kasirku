import { DB } from "@/database";
import { CreateUserDto } from "@/dtos/users.dto";
import { HttpException } from "@/exceptions/HttpException";
import { TokenData } from "@/interfaces/auth.interface";
import { User } from "@/interfaces/users.interface";
import { compare, hash } from "bcrypt";
import Container, { Service } from "typedi";
import { JwtService } from "./jwt.service";

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
        409,
        `This Username ${userData.username} was not found`
      );

    const isPasswordMatching: boolean = await compare(
      userData.password,
      findUser.password
    );

    if (!isPasswordMatching)
      throw new HttpException(409, "Password not matching");

    const accessToken = this.jwt.generateToken({
      id: findUser.id,
      role: findUser.role,
    });

    const refreshToken = this.jwt.generateRefreshToken({
      id: findUser.id,
    });

    return { accessToken, user: { id: findUser.id, role: findUser.role } };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await DB.Users.findOne({
      where: { username: userData.username, password: userData.password },
    });

    return findUser;
  }
}
