export default (sequelize, DataTypes) => {
  const ReportedComments = sequelize.define('ReportedComment', {
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
    commentId: {
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
      unique: false,
      type: DataTypes.STRING
    },
    initialComment: {
      required: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    displayMessage: {
      required: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('pending', 'resolved', 'blocked'),
      defaultValue: 'pending'
    },
    acceptedComment: {
      required: false,
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {});
  ReportedComments.associate = (models) => {
    ReportedComments.belongsTo(models.Article, { foreignKey: 'articleId' });
    ReportedComments.belongsTo(models.User, { foreignKey: 'userId' });
    ReportedComments.belongsTo(models.Comment, { foreignKey: 'commentId' });
  };
  return ReportedComments;
};
