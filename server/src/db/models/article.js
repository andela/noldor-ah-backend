export default (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
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
    title: {
      allowNull: false,
      required: true,
      unique: false,
      type: DataTypes.STRING
    },
    content: {
      required: true,
      allowNull: false,
      unique: false,
      type: DataTypes.TEXT
    },
    featuredImg: {
      required: false,
      allowNull: true,
      unique: false,
      type: DataTypes.TEXT
    },
  }, {});
  Article.associate = (models) => {
    Article.belongsTo(models.User);
  };
  return Article;
};
