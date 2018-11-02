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
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    },
    title: {
      allowNull: false,
      required: true,
      unique: false,
      type: Sequelize.STRING
    },
    description: {
      allowNull: false,
      required: true,
      type: Sequelize.STRING
    },
    content: {
      required: true,
      allowNull: false,
      unique: false,
      type: Sequelize.TEXT
    },
    slug: {
      required: true,
      allowNull: false,
      type: Sequelize.TEXT
    },
    featuredImg: {
      required: false,
      allowNull: true,
      unique: false,
      type: Sequelize.TEXT
    },
    published: {
      required: false,
      allowNull: false,
      type: Sequelize.BOOLEAN
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
  down: queryInterface => queryInterface.dropTable('Articles')
};
