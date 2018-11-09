export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ArticleTags', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    articleId: {
      required: true,
      type: Sequelize.Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Articles',
        key: 'id',
      },
    },
    tagId: {
      required: true,
      type: Sequelize.Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Tags',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('ArticleTags'),
};
