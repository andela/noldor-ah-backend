export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    firstName: {
      required: false,
      allowNull: true,
      unique: false,
      type: Sequelize.STRING
    },
    lastName: {
      required: false,
      allowNull: true,
      unique: false,
      type: Sequelize.STRING
    },
    username: {
      required: true,
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
    email: {
      required: true,
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
    password: {
      required: true,
      allowNull: false,
      unique: false,
      type: Sequelize.STRING
    },
    bio: {
      required: false,
      allowNull: true,
      unique: false,
      type: Sequelize.TEXT
    },
    confirmEmail: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: Sequelize.FALSE,
    },
    forgotPasswordHash: {
      required: false,
      allowNull: true,
      unique: true,
      type: Sequelize.STRING
    },
    avatarUrl: {
      required: false,
      allowNull: true,
      unique: false,
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  }, { paranoid: true }),
  down: queryInterface => queryInterface.dropTable('Users')
};
