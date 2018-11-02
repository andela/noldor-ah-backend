

export default (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      // defaultValue: DataTypes.UUIDV4
    },
    userId: {
      required: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      required: true,
      unique: false,
      type: DataTypes.STRING
    },
    description: {
<<<<<<< HEAD
      allowNull: false,
      required: true,
=======
      allowNull: true,
      required: false,
>>>>>>> feature(view/edit profile): enable user view/edit profile
      type: DataTypes.STRING
    },
    content: {
      required: true,
      allowNull: false,
      unique: false,
      type: DataTypes.TEXT
    },
    slug: {
<<<<<<< HEAD
      required: true,
      allowNull: false,
=======
      required: false,
      allowNull: true,
>>>>>>> feature(view/edit profile): enable user view/edit profile
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
<<<<<<< HEAD
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
  }, {

=======
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
>>>>>>> feature(view/edit profile): enable user view/edit profile
  });
  Article.associate = (models) => {
    Article.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Article;
};