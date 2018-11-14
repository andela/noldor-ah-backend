import search from './articleValidations/search';
import tags from './articleValidations/tags';
import forgotPassword from './userValidations/forgotPassword';
import login from './userValidations/login';
import resetPassword from './userValidations/resetPassword';
import signup from './userValidations/signup';
import token from './userValidations/token';
<<<<<<< HEAD
import add from './highlightValidations/add';
import uuidChecker from '../helpers/validParams';
import authorizeRole from './userValidations/authorizeRole';
import RoleValidation from './userValidations/roleValidation';
=======
import authorizeRole from './userValidations/authorizeRole';
import RoleValidation from './userValidations/roleValidation';
import decisionValidator from './userValidations/decisionValidator';
import acceptedCommentValidator from './userValidations/acceptedCommentValidator';
import statusValidator from './userValidations/statusValidator';
>>>>>>> feat(roleAccess): create role based functionality

const {
  validateSuperUserRole,
  validateAssignAdmin
} = RoleValidation;

export default {
  search,
  tags,
  forgotPassword,
  login,
  resetPassword,
  signup,
  token,
<<<<<<< HEAD
  add,
  uuidChecker,
  authorizeRole,
  validateSuperUserRole,
  validateAssignAdmin,
=======
  authorizeRole,
  validateSuperUserRole,
  validateAssignAdmin,
  decisionValidator,
  statusValidator,
  acceptedCommentValidator,
>>>>>>> feat(roleAccess): create role based functionality
};
