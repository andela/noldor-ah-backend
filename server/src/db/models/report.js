export default (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
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
    reportType: {
      allowNull: false,
      required: true,
      unique: false,
      type: DataTypes.STRING
    },
    reportDetail: {
      allowNull: false,
      required: true,
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      required: true,
      type: DataTypes.STRING
    },
    comment: {
      allowNull: true,
      required: false,
      type: DataTypes.STRING
    }
  }, {});
  Report.associate = (models) => {
    Report.belongsTo(models.User, { foreignKey: 'userId' });
    Report.belongsTo(models.Article, { foreignKey: 'articleId' });
  };
  return Report;
};
