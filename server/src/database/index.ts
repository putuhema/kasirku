import Sequelize from "sequelize";
import {
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} from "@/config";
import { logger } from "@utils/logger";
import UserModel from "@/models/users.model";
import TokenModel from "@/models/token.model";
import ProductsModel from "@/models/products.model";
import TransactionModel from "@/models/transaction.model";
import CategoryModel from "@/models/category.model";
import TransactionDetailModel from "@/models/transactionDetail";

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: "mysql",
  host: DB_HOST,
  port: Number(DB_PORT),
  timezone: "+09:00",
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === "development",
  logging: (query, time) => {
    logger.info(time + "ms" + " " + query);
  },
  benchmark: true,
});

sequelize.authenticate();

export const DB = {
  Users: UserModel(sequelize),
  Token: TokenModel(sequelize),
  Products: ProductsModel(sequelize),
  Category: CategoryModel(sequelize),
  Transaction: TransactionModel(sequelize),
  TrasactionDetail: TransactionDetailModel(sequelize),
  sequelize,
  Sequelize,
};
