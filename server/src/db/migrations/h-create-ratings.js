export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Ratings', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    userId: {
      required: true,
      allowNull: false,
      type: Sequelize.UUID
    },
    articleId: {
      required: true,
      allowNull: false,
      type: Sequelize.UUID
    },
    ratings: {
      allowNull: false,
      required: true,
      unique: false,
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Ratings')
};
