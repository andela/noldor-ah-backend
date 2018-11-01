import express from 'express';
import UserController from '../../controllers/UserController';
import Validation from '../../middlewares/validation';
import userToken from '../../middlewares/token';

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

export default router;
