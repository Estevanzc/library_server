'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Publishers', [
      {
        name: 'Editora 371',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mundo Cristão',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Editora Esperança',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Thomas Nelson',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Publishers', null, {});
  }
};
