export default(sequelize, DataTypes) => {
  const Categories = sequelize.define('Category', {
    name: {
      primaryKey: true,
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {});
  Categories.associate = (models) => {
    Categories.hasMany(models.Article, {
      foreignKey: 'category'
    });
  };
  return Categories;
};
