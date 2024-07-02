'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('schedules', {
        // currentNumber: DataTypes.STRING,
        // email: DataTypes.STRING,
        // maxNumber: DataTypes.INTEGER,
        // date: DataTypes.DATE,
        // timeType: DataTypes.STRING,
        // doctorId: DataTypes.STRING
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      currentNumber: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      maxNumber: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      timeType: {
        type: Sequelize.STRING
      },
      doctorId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('schedules');
  }
};