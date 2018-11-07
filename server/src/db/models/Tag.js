export default(sequelize, DataTypes) => {
  const Tags = sequelize.define('Tags', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Tags.associate = (models) => {
    Tags.belongsToMany(models.Article, {
      through: 'ArticleTags',
      as: 'articles',
      foreignKey: 'tagId',
      onDelete: 'CASCADE',
    });
  };
  return Tags;
};
