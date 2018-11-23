export default (sequelize, DataTypes) => {
  const CommentLike = sequelize.define('CommentLike', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      required: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    commentId: {
      required: true,
      allowNull: false,
      type: DataTypes.UUID
    }
  }, {});
  CommentLike.associate = (models) => {
    CommentLike.belongsTo(models.User, { foreignKey: 'userId' });
    CommentLike.belongsTo(models.Comment, { foreignKey: 'commentId' });
  };
  return CommentLike;
};
