import express from 'express';
import UserController from '../../controllers/UserController';
import Validators from '../../middlewares/validators';
import multifile from '../../helpers/multifile';

const router = express.Router();
const {
  register,
  login,
  getAllUser,
  forgetPassword,
  resetPassword,
  viewUserProfile,
  editUserProfile,
  deactivateUser,
} = UserController;

router.post('/users/register', Validators.signup, register);
router.post('/users/login/', Validators.login, login);
router.get('/users/', Validators.token, getAllUser);
router.put('/users/forgot', Validators.forgotPassword, forgetPassword);
router.post('/users/forgot/:hash', Validators.resetPassword, resetPassword);
router.post('/users/register', Validators.signup, UserController.register);
router.post('/users/login', Validators.login, UserController.login);
router.get('/users/:userId/profiles', Validators.uuidChecker, viewUserProfile);
router.put('/users/:userId/profiles', Validators.token, multifile, editUserProfile);
router.delete('/users/:userId/deactivate', Validators.token, deactivateUser);

export default router;
