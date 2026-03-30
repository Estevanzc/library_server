'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: "Fiction",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Non-Fiction",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Children",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Young Adult",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Academic",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Reference",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Comics & Graphic Novels",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Poetry",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Drama",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Religion & Spirituality",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Science & Technology",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "History",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Arts & Photography",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Travel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cooking & Food",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Health & Fitness",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Business & Economics",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Education",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Self-Help",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "True Crime",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
