import { Token } from "@/interfaces/token.interface";
import { DataTypes, Model, Sequelize } from "sequelize";
import { UserModel } from "./users.model";

export class TokenModel extends Model<Token> implements Token {
  public id?: number;
  public userId: number;
  public token: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof TokenModel {
  TokenModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      token: {
        type: DataTypes.STRING,
      },
    },
    { tableName: "tokens", sequelize }
  );

  return TokenModel;
}
