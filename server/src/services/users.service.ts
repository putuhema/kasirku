import { DB } from "@/database";
import { HttpException } from "@/exceptions/HttpException";
import { User } from "@/interfaces/users.interface";
import { hash } from "bcrypt";
import { Service } from "typedi";
import bcrypt from "bcrypt";
import { deleteImage } from "@/utils/file";
import { Op } from "sequelize";

@Service()
export class UserService {
  public async findAllUser(role?: string): Promise<User[]> {
    if (role) {
      return await DB.Users.findAll({
        where: {
          role: role,
          status: {
            [Op.in]: ["active", "disabled"],
          },
        },
      });
    } else {
      return await DB.Users.findAll();
    }
  }

  public async findUser(id: number): Promise<User> {
    const findUser: User = await DB.Users.findByPk(id);
    if (!findUser) throw new HttpException(409, "User does't exist");

    const user: User = await DB.Users.findOne({ where: { id } });
    return user;
  }

  public async createUser({
    name,
    username,
    email,
    role,
    imgUrl,
    phone,
    status,
    password,
  }: User) {
    const hashPassword = await hash(password, 10);
    const user: User = await DB.Users.create({
      name,
      username,
      email,
      imgUrl,
      role,
      phone,
      status,
      password: hashPassword,
    });
    return user;
  }

  public async updateUser(
    userId: number,
    { name, username, email, role, imgUrl, phone, status }: User
  ) {
    const findUser: User = await DB.Users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User does't exist");

    await DB.Users.update(
      {
        name,
        username,
        email,
        imgUrl,
        role,
        phone,
        status,
      },
      {
        where: { id: userId },
      }
    );

    const updatedUser: User = await DB.Users.findByPk(userId);
    return updatedUser;
  }

  public async userSettings(userId: number, { name, username, email, phone }) {
    const findUser: User = await DB.Users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User does't exist");

    await DB.Users.update(
      {
        name,
        username,
        email,
        phone,
      },
      {
        where: { id: userId },
      }
    );

    const updatedUser: User = await DB.Users.findByPk(userId);
    return updatedUser;
  }

  public async changeStatus(userId: number) {
    const findUser: User = await DB.Users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User does't exist");

    const status = findUser.status == "active" ? "disabled" : "active";
    await DB.Users.update(
      {
        status: status,
      },
      { where: { id: userId } }
    );

    const updatedUser: User = await DB.Users.findByPk(userId);
    return updatedUser;
  }

  public async deleteUser(id: number) {
    const findUser: User = await DB.Users.findByPk(id);
    if (!findUser) throw new HttpException(409, "User does't exist");

    if (findUser.imgUrl !== "uploads/default.jpg") {
      await deleteImage(findUser.imgUrl);
    }
    await DB.Users.update(
      {
        status: "deleted",
      },
      {
        where: { id },
      }
    );

    return findUser;
  }
  public async postProfile(imgUrl: string, id: number) {
    const findUser: User = await DB.Users.findByPk(id);
    if (!findUser) throw new HttpException(409, "User does't exist");

    await deleteImage(findUser.imgUrl);
    await DB.Users.update(
      {
        imgUrl,
      },
      { where: { id } }
    );
  }

  public async checkPassword(
    userId: number,
    password: string
  ): Promise<boolean> {
    const findUser: User = await DB.Users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User does't exist");

    const isPasswordMatching = await bcrypt.compare(
      password,
      findUser.password
    );
    if (!isPasswordMatching) throw new HttpException(409, "Wrong Password");

    return isPasswordMatching;
  }
  public async changePassword(userId: number, password: string): Promise<User> {
    const findUser: User = await DB.Users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User does't exist");

    const hashPassword = await bcrypt.hash(password, 10);
    await DB.Users.update(
      {
        password: hashPassword,
      },
      { where: { id: userId } }
    );

    const updatedUser: User = await DB.Users.findByPk(userId);
    return updatedUser;
  }
}
