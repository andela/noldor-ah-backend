export default (sequelize, DataTypes) => {
  const CommentHistory = sequelize.define('CommentHistory', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      required: true,
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    commentId: {
      required: true,
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Comments',
        key: 'id'
      }
    },
    comment: {
      required: true,
      allowNull: false,
      unique: false,
      type: DataTypes.TEXT
    },
  }, { freezeTableName: true });
  CommentHistory.associate = (models) => {
    CommentHistory.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    CommentHistory.belongsTo(models.Comment, {
      foreignKey: 'commentId'
    });
  };
  return CommentHistory;
};
