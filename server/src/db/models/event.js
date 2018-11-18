export default (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
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
    eventType: {
      required: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    status: {
      required: false,
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

  }, {
    getterMethods: {
      action() {
        if (this.getDataValue('eventType') === 'article') {
          return 'has published a new article';
        }
        if (this.getDataValue('eventType') === 'comment') {
          return 'has commented on an new article you liked';
        }
      }
    }
  });
  Events.associate = (models) => {
    Events.belongsTo(models.User, { foreignKey: 'userId' });
    Events.belongsTo(models.Article, { foreignKey: 'articleId' });

    Events.belongsToMany(models.User, {
      through: 'Notifications',
      as: 'Notified',
      foreignKey: 'eventId',
      onDelete: 'CASCADE'
    });
  };
  return Events;
};
