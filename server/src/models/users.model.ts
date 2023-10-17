import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { User } from "@/interfaces/users.interface";

export class UserModel extends Model<User> implements User {
  public id: number;
  public name: string;
  public username: string;
  public email: string;
  public phone: string;
  public imgUrl: string;
  public role: string;
  public password: string;
  public status: string;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      imgUrl: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING(45),
        defaultValue: "cashier",
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING(45),
        defaultValue: "active",
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: "users",
      sequelize,
    }
  );

  return UserModel;
}
