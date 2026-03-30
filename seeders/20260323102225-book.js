'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Books', [
      {
        title: "livro1",
        subtitle: "subtitulo1",
        isbn: "6589198780",
        leanguage_id: 1,
        sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit laboriosam exercitationem dolore, vero magni, laudantium nostrum eligendi omnis ea atque iure aperiam provident maxime? Consequuntur eos laborum quod voluptate et.",
        pages: 235,
        publication_year: 2019,
        author_id: 1,
        publisher_id: 1,
        category_id: 1,
        genre_id: 1,
        inventory: 24,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "livro2",
        subtitle: "subtitulo2",
        isbn: "857860184X",
        leanguage_id: 1,
        sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit laboriosam exercitationem dolore, vero magni, laudantium nostrum eligendi omnis ea atque iure aperiam provident maxime? Consequuntur eos laborum quod voluptate et.",
        pages: 235,
        publication_year: 2019,
        author_id: 1,
        publisher_id: 1,
        category_id: 1,
        genre_id: 1,
        inventory: 24,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "livro3",
        subtitle: "subtitulo3",
        isbn: "6556891657",
        leanguage_id: 1,
        sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit laboriosam exercitationem dolore, vero magni, laudantium nostrum eligendi omnis ea atque iure aperiam provident maxime? Consequuntur eos laborum quod voluptate et.",
        pages: 235,
        publication_year: 2019,
        author_id: 1,
        publisher_id: 1,
        category_id: 1,
        genre_id: 1,
        inventory: 24,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
