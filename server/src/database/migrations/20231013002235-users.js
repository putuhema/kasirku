'use strict';

/** @type {import('sequelize-cli').Migration} */
const tableName = "users"
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
        type: DataTypes.ENUM,
        values: ["active", "disabled", "deleted"],
        defaultValue: "active",
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName)
  }
};
