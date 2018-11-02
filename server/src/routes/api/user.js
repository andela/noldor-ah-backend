import express from 'express';
import UserController from '../../controllers/UserController';
import Validation from '../../middlewares/validation';
import userToken from '../../middlewares/token';
import multifile from '../../helpers/multer';
import uuidChecker from '../../helpers/validationHelpers/uuidCheck';

const router = express.Router();

const {
  signupValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} = Validation;

const {
  register,
  login,
  getAllUser,
  forgetPassword,
  resetPassword,
  viewUserProfile,
  editUserProfile,
  deactivateUser
} = UserController;

const {
  validateToken,

} = userToken;

router.post('/users/register', signupValidation, register);
router.post('/users/login/', loginValidation, login);
router.get('/users/', validateToken, getAllUser);
router.put('/users/forgot', forgotPasswordValidation, forgetPassword);
router.post('/users/forgot/:hash', resetPasswordValidation, resetPassword);
router.post('/users/register', Validation.signupValidation, UserController.register);
router.post('/users/login', Validation.loginValidation, UserController.login);
router.get('/users/:userId/profiles', uuidChecker, viewUserProfile);
router.put('/users/:userId/profiles', validateToken, multifile, editUserProfile);
router.delete('/users/:userId/deactivate', validateToken, deactivateUser);

export default router;
