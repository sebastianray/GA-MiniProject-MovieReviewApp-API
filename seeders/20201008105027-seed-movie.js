'use strict';
const fs = require('fs');

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

    const parseData = JSON.parse(fs.readFileSync('./seederMovie.json'));
    const movieData = [];
    parseData.forEach(data => {
      const { title, synopsis, genre, poster, trailer, rated, voteCount, releaseDate, language } = data;
      movieData.push({
        title, synopsis, genre, poster, trailer, rated, voteCount, releaseDate, language,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    await queryInterface.bulkInsert('Movies', movieData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
