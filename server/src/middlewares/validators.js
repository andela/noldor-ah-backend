import search from './articleValidations/search';
import tags from './articleValidations/tags';
import createProfile from './userValidations/createProfile';
import forgotPassword from './userValidations/forgotPassword';
import login from './userValidations/login';
import resetPassword from './userValidations/resetPassword';
import signup from './userValidations/signup';
import token from './userValidations/token';
import uuidChecker from './userValidations/uuidChecker';

export default {
  search,
  tags,
  createProfile,
  forgotPassword,
  login,
  resetPassword,
  signup,
  token,
  uuidChecker
};
