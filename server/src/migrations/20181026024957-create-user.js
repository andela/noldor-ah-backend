export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    firstName: {
      required: true,
      allowNull: false,
      unique: false,
      type: Sequelize.STRING
    },
    lastName: {
      required: true,
      allowNull: false,
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
      required: true,
      allowNull: false,
      unique: false,
      type: Sequelize.TEXT
    },
    confirmEmail: {
      allowNull: true,
      type: Sequelize.STRING
    },
    avatarUrl: {
      required: true,
      allowNull: false,
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
    }
  }),
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
