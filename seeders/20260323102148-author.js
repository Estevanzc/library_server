'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Authors', [
      {
        name: 'John Piper',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tim Keller',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tish Warren',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Yago Martins',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Authors', null, {});
  }
};
