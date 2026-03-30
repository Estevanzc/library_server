'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const bcrypt = require('bcrypt');
    const password = await bcrypt.hash('admin', 10);
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Estevan Zimermann',
        email: 'estevan.zimermann@gmail.com',
        password: password,
        birth: new Date('2008-02-26'),
        type: 2,
        registration: "202310040255",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: password,
        birth: new Date('2000-05-20'),
        registration: "202310040256",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: password,
        birth: new Date('1998-11-10'),
        registration: "202310040257",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'John Doe\'s brother',
        email: 'johndoesbrother@example.com',
        password: password,
        birth: new Date('1998-11-10'),
        registration: "202310040258",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
