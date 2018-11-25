import bcrypt from 'bcrypt';

const decodePassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
};

export default decodePassword;
