export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Articles', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    userId: {
      required: true,
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    title: {
      allowNull: false,
      required: true,
      unique: false,
      type: Sequelize.STRING
    },
    content: {
      required: true,
      allowNull: false,
      unique: false,
      type: Sequelize.TEXT
    },
    featuredImg: {
      required: false,
      allowNull: true,
      unique: false,
      type: Sequelize.TEXT
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Articles')
};
