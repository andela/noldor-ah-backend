import express from 'express';
import UserController from '../../controllers/UserController';
import Validators from '../../middlewares/validators';
import multifile from '../../helpers/multifile';
import FollowingController from '../../controllers/FollowingController';
import ValidateParams from '../../middlewares/reqParams';
import EmailVerification from '../../workers/VerificationWorker';

const router = express.Router();

const {
  userFollower,
  userFollowing,
  followUser,
} = FollowingController;

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

const {
  userIdChecker
} = ValidateParams;

const { isVerified } = EmailVerification;

const {
  token,
  signup
} = Validators;


router.post('/users/register', signup, register);
router.post('/users/login/', Validators.login, login);
router.get('/users/', token, getAllUser);
router.put('/users/forgot', Validators.forgotPassword, forgetPassword);
router.post('/users/forgot/:hash', Validators.resetPassword, resetPassword);
router.get('/users/:userId/profiles', userIdChecker, viewUserProfile);
router.put('/users/:userId/profiles', userIdChecker, token, isVerified, multifile, editUserProfile);
router.delete('/users/:userId/deactivate', token, deactivateUser);


router.get('/users/:userName/followings', token, userFollowing);
router.get('/users/:userName/followers', token, userFollower);
router.post('/users/:userName/follow', token, followUser);

export default router;
