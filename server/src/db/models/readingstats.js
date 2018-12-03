export default (sequelize, DataTypes) => {
  const ReadingStats = sequelize.define('ReadingStats', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      required: true,
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    articleId: {
      required: true,
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Article',
        key: 'id'
      }
    }
  }, { freezeTableName: true });
  ReadingStats.associate = (models) => {
    ReadingStats.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    ReadingStats.belongsTo(models.Article, {
      foreignKey: 'articleId'
    });
  };
  return ReadingStats;
};
