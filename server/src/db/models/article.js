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
    description: {
      allowNull: false,
      required: true,
      type: DataTypes.STRING
    },
    content: {
      required: true,
      allowNull: false,
      unique: false,
      type: DataTypes.TEXT
    },
    slug: {
      required: true,
      allowNull: false,
      type: DataTypes.TEXT,
      set(val) {
        const articleId = this.id.split('-').pop();
        const value = `${val}-${articleId}`;
        this.setDataValue('slug', value);
      }
    },
    featuredImg: {
      required: false,
      allowNull: true,
      unique: false,
      type: DataTypes.TEXT
    },
    published: {
      required: false,
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
  }, {});
  Article.associate = (models) => {
    Article.belongsTo(models.User, { foreignKey: 'userId' });

    Article.belongsToMany(models.Tags, {
      through: 'ArticleTags',
      as: 'tags',
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });

    Article.belongsToMany(models.User, {
      through: 'userReactions',
      as: 'users',
      foreignKey: 'articleId'
    });
  };
  return Article;
};
