export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ReportedComments', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    userId: {
      required: true,
      allowNull: false,
      unique: false,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'reportingUser'
      },
    },
    articleId: {
      required: true,
      allowNull: false,
      unique: false,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Articles',
        key: 'id',
        as: 'articleId'
      }
    },
    commentId: {
      required: true,
      allowNull: false,
      unique: true,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Comments',
        key: 'id',
        as: 'commentId'
      }
    },
    reportType: {
      allowNull: false,
      required: true,
      type: Sequelize.STRING
    },
    reportDetail: {
      allowNull: false,
      required: true,
      type: Sequelize.STRING
    },
    initialComment: {
      required: true,
      allowNull: false,
      unique: false,
      type: Sequelize.TEXT
    },
    displayMessage: {
      required: true,
      allowNull: false,
      unique: false,
      type: Sequelize.TEXT,
    },
    status: {
      required: false,
      allowNull: false,
      unique: false,
      type: Sequelize.ENUM,
      values: ['pending', 'resolved', 'blocked'],
      defaultValue: 'pending',
    },
    acceptedComment: {
      required: false,
      allowNull: true,
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
  down: queryInterface => queryInterface.dropTable('ReportedComments'),
};
