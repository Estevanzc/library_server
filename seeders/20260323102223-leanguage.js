'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Leanguages', [
      {
        name: 'Portuguese Brazilian',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'English United States',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'German',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'French',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Leanguages', null, {});
  }
};
