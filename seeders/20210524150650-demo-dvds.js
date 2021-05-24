'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('DVDs', [{
      name:'Princess Bride, The',
      year: 1987,
      location_id: 1,
      imdb_id: 1,
      user_id: 1
    },
    {
      name:'Death to Smoochy',
      year: 2002,
      location_id: 2,
      imdb_id: 2,
      user_id: 2

    }], {})
  
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
