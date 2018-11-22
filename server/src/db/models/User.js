const Users = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      required: false,
      allowNull: true,
      unique: false,
      type: DataTypes.STRING
    },
    lastName: {
      required: false,
      allowNull: true,
      unique: false,
      type: DataTypes.STRING
    },
    username: {
      required: true,
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    email: {
      required: true,
      allowNull: false,
      unique: true,
      type: DataTypes.TEXT
    },
    password: {
      required: true,
      allowNull: false,
      unique: false,
      type: DataTypes.STRING
    },
    bio: {
      required: false,
      allowNull: true,
      unique: false,
      type: DataTypes.TEXT
    },
    confirmEmail: () => {
      let variable;
      if (process.env.NODE_ENV === 'test') {
        variable = {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        };
      } else {
        variable = {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          defaultValue: false
        };
      }
      return variable;
    },
    emailVerificationHash: {
      required: true,
      allowNull: true,
      unique: true,
      type: DataTypes.STRING
    },
    forgotPasswordHash: {
      required: false,
      allowNull: true,
      unique: true,
      type: DataTypes.STRING
    },
    avatarUrl: {
      required: false,
      allowNull: true,
      unique: false,
      type: DataTypes.STRING
    },
  }, { paranoid: true });
  User.associate = (models) => {
    User.belongsToMany(models.Article, {
      through: 'userReactions',
      as: 'articles',
      foreignKey: 'userId'
    }, {
      onDelete: 'CASCADE'
    });
    User.belongsToMany(User, {
      through: 'Followings',
      as: 'Follower',
      foreignKey: 'followingId',
    });
    User.belongsToMany(User, {
      through: 'Followings',
      as: 'Following',
      foreignKey: 'followerId',
    });
    User.hasMany(models.Reply, { foreignKey: 'userId' });
  };
  return User;
};

export default Users;
