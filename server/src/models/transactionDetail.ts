import { TransactionDetail } from "@/interfaces/transactionDetail.interface";
import { DataTypes, Model, Sequelize } from "sequelize";
import { ProductsModel } from "./products.model";
import { TransactionModel } from "./transaction.model";

export class TransactionDetailModel
  extends Model<TransactionDetail>
  implements TransactionDetail
{
  public id?: number;
  public quantity: number;
  public price: number;
  public transactionId?: number;
  public productId?: number;
  public status: "active" | "disabled" | "deleted";

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

export default function (sequelize: Sequelize): typeof TransactionDetailModel {
  TransactionDetailModel.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      transactionId: {
        type: DataTypes.INTEGER,
      },
      productId: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["active", "disabled", "deleted"],
        defaultValue: "active",
      },
    },
    { tableName: "transaction_details", sequelize }
  );

  ProductsModel.hasMany(TransactionDetailModel, {
    foreignKey: "product_id",
    onDelete: "CASCADE",
  });
  TransactionDetailModel.belongsTo(ProductsModel, {
    foreignKey: "product_id",
    onDelete: "CASCADE",
  });
  TransactionModel.hasMany(TransactionDetailModel, {
    foreignKey: "transaction_id",
    onDelete: "CASCADE",
  });
  TransactionDetailModel.belongsTo(TransactionModel, {
    foreignKey: "transaction_id",
    onDelete: "CASCADE",
  });

  return TransactionDetailModel;
}
