export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
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
    articleId: {
      required: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    comment: {
      required: true,
      allowNull: false,
      unique: false,
      type: DataTypes.TEXT
    },
  }, {});
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Article, { foreignKey: 'articleId' });
    Comment.hasMany(models.Reply, { foreignKey: 'commentId' });
    Comment.hasOne(models.Highlights, { foreignKey: 'commentId' });
    Comment.hasMany(models.CommentLike, { foreignKey: 'commentId' });
  };
  return Comment;
};
