'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Preferences', [
      {
        keyword: 'Tech',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        keyword: 'Fiction',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        keyword: 'Science',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        keyword: 'Animation',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Preferences', null, {});
  }
};
