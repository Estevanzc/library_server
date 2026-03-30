'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Book_reviews', [
      {
        book_id: 1,
        user_id: 1,
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit laboriosam exercitationem dolore, vero magni, laudantium nostrum eligendi omnis ea atque iure aperiam provident maxime? Consequuntur eos laborum quod voluptate et.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        book_id: 1,
        user_id: 2,
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit laboriosam exercitationem dolore, vero magni, laudantium nostrum eligendi omnis ea atque iure aperiam provident maxime? Consequuntur eos laborum quod voluptate et.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        book_id: 1,
        user_id: 3,
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit laboriosam exercitationem dolore, vero magni, laudantium nostrum eligendi omnis ea atque iure aperiam provident maxime? Consequuntur eos laborum quod voluptate et.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        book_id: 1,
        user_id: 4,
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit laboriosam exercitationem dolore, vero magni, laudantium nostrum eligendi omnis ea atque iure aperiam provident maxime? Consequuntur eos laborum quod voluptate et.",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Book_reviews', null, {});
  }
};
