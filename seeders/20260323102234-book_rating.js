'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Book_ratings', [
      {
        book_id: 1,
        user_id: 1,
        rating: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        book_id: 1,
        user_id: 2,
        rating: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        book_id: 1,
        user_id: 3,
        rating: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        book_id: 1,
        user_id: 4,
        rating: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Book_rating', null, {});
  }
};
