'use strict';

/** @type {import('sequelize-cli').Migration} */
const tableName = "token"
module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.createTable(tableName, {
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
    })

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName)
  }
};
