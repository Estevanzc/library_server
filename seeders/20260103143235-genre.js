'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Genres', [
      {
        name: "Fantasy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Science Fiction",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mystery",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Thriller",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Romance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Horror",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Historical Fiction",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Adventure",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dystopian",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Paranormal",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Magical Realism",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Crime",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Western",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Action",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Satire",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Drama",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Comedy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tragedy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Biography",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Autobiography",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Memoir",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Essay",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Self-Help",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Philosophy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Psychology",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Religion",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Science",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Technology",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Travel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Guide",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Genres', null, {});
  }
};
