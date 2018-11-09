export default (sequelize, DataTypes) => {
  const Ratings = sequelize.define('Ratings', {
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
    ratings: {
      allowNull: false,
      required: true,
      unique: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Ratings.associate = (models) => {
    Ratings.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    Ratings.belongsTo(models.Article, {
      foreignKey: 'articleId',
    });
  };
  return Ratings;
};
