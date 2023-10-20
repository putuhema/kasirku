import { Category } from "@/interfaces/category.interface";
import { DataTypes, Model, Sequelize } from "sequelize";
import { ProductsModel } from "./products.model";

export class CategoryModel extends Model<Category> implements Category {
  public id?: number;
  public name: string;
  public status: "active" | "disabled" | "deleted";
}

export default function (sequelize: Sequelize): typeof CategoryModel {
  CategoryModel.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["active", "disabled", "deleted"],
        defaultValue: "active",
      },
    },
    { tableName: "categories", sequelize }
  );

  CategoryModel.hasMany(ProductsModel, {
    foreignKey: "category_id",
  });
  ProductsModel.belongsTo(CategoryModel, {
    foreignKey: "category_id",
  });

  return CategoryModel;
}
