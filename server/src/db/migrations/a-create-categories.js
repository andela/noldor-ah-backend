export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Categories', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    name: {
      primaryKey: true,
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('Categories'),
};
