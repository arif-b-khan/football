'use strict';

const { catchError } = require('rxjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    try {
      await queryInterface.bulkInsert('Users', [
        {
          username: 'admin',
          password: 'test1234',
          email: 'admin@football.com',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  },
};
