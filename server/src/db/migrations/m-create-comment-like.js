export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CommentLikes', {
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
        key: 'id'
      }
    },
    commentId: {
      required: true,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Comments',
        key: 'id'
      }
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
  down: queryInterface => queryInterface.dropTable('CommentLikes')
};
