import express from 'express';
import UserController from '../../controllers/UserController';
import Validators from '../../middlewares/validators';
import multifile from '../../helpers/multifile';
import FollowingController from '../../controllers/FollowingController';
import ValidateParams from '../../middlewares/reqParams';

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


router.post('/users/register', Validators.signup, register);
router.post('/users/login/', Validators.login, login);
router.get('/users/', Validators.token, getAllUser);
router.put('/users/forgot', Validators.forgotPassword, forgetPassword);
router.post('/users/forgot/:hash', Validators.resetPassword, resetPassword);
<<<<<<< HEAD
<<<<<<< HEAD

router.get('/users/:userId/profiles', userIdChecker, viewUserProfile);
router.put('/users/:userId/profiles', userIdChecker, Validators.token, multifile, editUserProfile);
=======
=======


>>>>>>> feat(roleAccess): create role based functionality
router.get('/users/:userId/profiles', userIdChecker, viewUserProfile);
router.put('/users/:userId/profiles', userIdChecker, Validators.token, multifile, editUserProfile);
router.get('/users/:userId/profiles', Validators.uuidChecker, viewUserProfile);
router.put('/users/:userId/profiles', Validators.token, multifile, editUserProfile);
>>>>>>> feat(roleAccess): create role based functionality
router.delete('/users/:userId/deactivate', Validators.token, deactivateUser);


router.get('/users/:userName/followings', Validators.token, userFollowing);
router.get('/users/:userName/followers', Validators.token, userFollower);
router.post('/users/:userName/follow', Validators.token, followUser);

export default router;
