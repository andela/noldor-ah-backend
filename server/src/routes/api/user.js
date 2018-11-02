import express from 'express';
import UserController from '../../controllers/UserController';
import Validation from '../../middlewares/validation';
<<<<<<< HEAD
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
=======
import Token from '../../middlewares/token';

const router = express.Router();

router.post('/users/register', Validation.signupValidation, UserController.register);
<<<<<<< HEAD
router.post('/users/login', Validation.loginValidation, UserController.login);
=======
router.post('/users/login/', Validation.loginValidation, UserController.login);
router.get('/users/:userId/profiles', UserController.viewUserProfile);
router.put('/users/:userId/profiles', Token.validateToken, UserController.editUserProfile);
router.delete('/users/:userId/profiles', Token.validateToken, UserController.deleteUser);
>>>>>>> feature(view/edit profile): enable user view/edit profile
>>>>>>> feature(view/edit profile): enable user view/edit profile

export default router;
