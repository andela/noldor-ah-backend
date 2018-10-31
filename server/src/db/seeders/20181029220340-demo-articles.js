import mockArticle from '../../helpers/seedData/articles.json';

export default {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Article', mockArticle, {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Article', null, {});
  }
};
