'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Loans', [
      {
        book_id: 1,
        user_id: 1,
        devolution_date: "2026-04-10",
        renews: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        book_id: 2,
        user_id: 1,
        devolution_date: "2026-03-30",
        renews: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        book_id: 3,
        user_id: 1,
        devolution_date: "2026-04-10",
        renews: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        book_id: 1,
        user_id: 4,
        devolution_date: "2026-04-10",
        renews: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Loans', null, {});
  }
};
