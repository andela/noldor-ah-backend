export default(sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER
    },
    userId: {
      required: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    eventId: {
      required: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    status: {
      required: true,
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {});
  Notification.associate = (models) => {
    Notification.belongsTo(models.Events, {
      foreignKey: 'eventId'
    });
    Notification.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Notification;
};
