import { DataTypes, Model, Sequelize } from "sequelize";
import { Products } from "@/interfaces/products.interface";

export class ProductsModel extends Model<Products> implements Products {
  public id?: number;
  public name: string;
  public price: number;
  public stock: number;
  public description: string;
  public imgUrl: string;
}

export default function (sequelize: Sequelize): typeof ProductsModel {
  ProductsModel.init(
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
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      imgUrl: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    { tableName: "products", sequelize }
  );

  return ProductsModel;
}
