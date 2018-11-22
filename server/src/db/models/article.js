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
  }, {

    getterMethods: {
      readingTime() {
        if (this.getDataValue('content')) {
          const readingTime = Math.round((this.content.split(' ').length) / 200);
          if (readingTime === 0) {
            return 'less than 1 minute';
          }
          return `${readingTime} min read`;
        }
      }
    },
  });
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

    Article.hasMany(models.Highlights, { foreignKey: 'articleId' });

    Article.belongsTo(models.Category, {
      foreignKey: 'category'
    });
  };
  return Article;
};
