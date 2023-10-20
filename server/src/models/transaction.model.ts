import { Transaction } from "@/interfaces/transaction.interface";
import { DataTypes, Model, Sequelize } from "sequelize";
import { TransactionDetailModel } from "./transactionDetail";

export class TransactionModel
  extends Model<Transaction>
  implements Transaction
{
  public id?: number;
  public costumerName: string;
  public paymentMethod: string;
  public status: "active" | "disabled" | "deleted";

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

export default function (sequelize: Sequelize): typeof TransactionModel {
  TransactionModel.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      costumerName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["active", "disabled", "deleted"],
        defaultValue: "active",
      },
      paymentMethod: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { tableName: "transactions", sequelize }
  );

  return TransactionModel;
}
