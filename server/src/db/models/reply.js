export default (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
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
    commentId: {
      required: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    reply: {
      required: true,
      allowNull: false,
      unique: false,
      type: DataTypes.TEXT
    }
  }, {});
  Reply.associate = (models) => {
    Reply.belongsTo(models.User, { foreignKey: 'userId' });
    Reply.belongsTo(models.Comment, { foreignKey: 'commentId' });
  };
  return Reply;
};
