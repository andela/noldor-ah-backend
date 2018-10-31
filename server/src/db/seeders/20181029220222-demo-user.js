import mockUser from '../../helpers/seedData/users.json';

export default {
  up: (queryInterface, Sequelize) => { queryInterface.bulkInsert('User', [], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
