export default (sequelize, DataTypes) => {
  const ReplyLike = sequelize.define('ReplyLike', {
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
    replyId: {
      required: true,
      allowNull: false,
      type: DataTypes.UUID
    }
  }, {});
  ReplyLike.associate = (models) => {
    ReplyLike.belongsTo(models.User, { foreignKey: 'userId' });
    ReplyLike.belongsTo(models.Reply, { foreignKey: 'replyId' });
  };
  return ReplyLike;
};
