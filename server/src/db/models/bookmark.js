export default (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
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
  }, {});
  Bookmark.associate = (models) => {
    Bookmark.belongsTo(models.User, { foreignKey: 'userId' });
    Bookmark.belongsTo(models.Article, { foreignKey: 'articleId' });
  };
  return Bookmark;
};
