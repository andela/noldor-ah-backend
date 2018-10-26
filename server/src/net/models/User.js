export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    first_name: {
      required: true,
      allowNull: false,
      unique: false,
      type: DataTypes.STRING
    },
    last_name: {
      required: true,
      allowNull: false,
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
      required: true,
      allowNull: false,
      unique: false,
      type: DataTypes.TEXT
    },
    confirmEmail: {
      allowNull: true,
      type: DataTypes.STRING
    },
    avatar_url: {
      required: true,
      allowNull: false,
      unique: false,
      type: DataTypes.STRING
    },
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Article);
  };
  return User;
};
