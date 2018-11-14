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
    category: {
      equired: true,
      allowNull: false,
      unique: false,
      type: DataTypes.STRING,
    },
    published: {
      required: false,
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    ratings: {
      required: false,
      allowNull: true,
      type: DataTypes.INTEGER
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

<<<<<<< HEAD
    Article.hasMany(models.Highlights, { foreignKey: 'articleId' });

=======
>>>>>>> feat(roleAccess): create role based functionality
    Article.belongsTo(models.Category, {
      foreignKey: 'category'
    });
  };
  return Article;
};
