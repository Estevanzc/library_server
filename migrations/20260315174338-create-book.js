'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      subtitle: {
        type: Sequelize.STRING
      },
      isbn: {
        type: Sequelize.STRING
      },
      leanguage_id: {
        type: Sequelize.INTEGER
      },
      sinopsis: {
        type: Sequelize.TEXT
      },
      pages: {
        type: Sequelize.INTEGER
      },
      publication_year: {
        type: Sequelize.INTEGER
      },
      publisher_id: {
        type: Sequelize.INTEGER
      },
      cover: {
        type: Sequelize.STRING
      },
      inventory: {
        type: Sequelize.INTEGER
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};