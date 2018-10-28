const Users = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
<<<<<<< HEAD:server/src/db/models/User.js
      required: false,
      allowNull: true,
=======
      required: true,
      allowNull: false,
>>>>>>> feat(Authentication):user receive token on registration:server/src/net/models/User.js
      unique: false,
      type: DataTypes.STRING
    },
    lastName: {
<<<<<<< HEAD:server/src/db/models/User.js
      required: false,
      allowNull: true,
=======
      required: true,
      allowNull: false,
>>>>>>> feat(Authentication):user receive token on registration:server/src/net/models/User.js
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
      type: DataTypes.STRING
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
    confirmEmail: {
<<<<<<< HEAD:server/src/db/models/User.js
=======
      allowNull: true,
      type: DataTypes.STRING
    },
    avatarUrl: {
      required: true,
>>>>>>> feat(Authentication):user receive token on registration:server/src/net/models/User.js
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    avatarUrl: {
      required: false,
      allowNull: true,
      unique: false,
      type: DataTypes.STRING
    },
  }, {});
  User.associate = () => {

  };
  return User;
};

export default Users;
