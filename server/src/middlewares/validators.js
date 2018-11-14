import postArticle from './articleValidations/postArticle';
import search from './articleValidations/search';
import tags from './articleValidations/tags';
import forgotPassword from './userValidations/forgotPassword';
import login from './userValidations/login';
import resetPassword from './userValidations/resetPassword';
import signup from './userValidations/signup';
import token from './userValidations/token';
import uuidChecker from './userValidations/uuidChecker';

export default {
  postArticle,
  search,
  tags,
  forgotPassword,
  login,
  resetPassword,
  signup,
  token,
  uuidChecker
};
