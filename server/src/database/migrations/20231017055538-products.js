'use strict';

/** @type {import('sequelize-cli').Migration} */
const tableName = "products"
module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.createTable(tableName, {
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
      status: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["active", "disabled", "deleted"],
        defaultValue: "active",
      },
      stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  }
};
