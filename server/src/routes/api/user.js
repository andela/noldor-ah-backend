import express from 'express';
import UserController from '../../controllers/UserController';
import Validators from '../../middlewares/validators';
import multifile from '../../helpers/multifile';
import userToken from '../../middlewares/token';
import FollowingController from '../../controllers/FollowingController';

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

const {
  userFollower,
  userFollowing,
  followUser,
  unfollowUser
} = FollowingController;

const {
  validateToken,

} = userToken;

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


router.get('/users/:userName/followings', validateToken, userFollowing);
router.get('/users/:userName/followers', validateToken, userFollower);
router.post('/users/:userName/follow', validateToken, followUser);
router.delete('/users/:userName/unfollow', validateToken, unfollowUser);

export default router;
