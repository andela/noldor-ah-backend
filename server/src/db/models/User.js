const Users = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      // defaultValue: DataTypes.UUIDV4
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
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    avatarUrl: {
      required: false,
      allowNull: true,
      unique: false,
      type: DataTypes.STRING
    },
<<<<<<< HEAD
  }, {});
  User.associate = () => {

=======
  });
  User.associate = (models) => {
    User.hasMany(models.Article, {
      foreignKey: 'userId',
      as: 'articles'
    }, {
      onDelete: 'cascade'
    });
>>>>>>> feature(view/edit profile): enable user view/edit profile
  };
  return User;
};

export default Users;
