import express from 'express';
import UserController from '../../controllers/UserController';
import Validators from '../../middlewares/validators';
import multifile from '../../helpers/multifile';
import FollowingController from '../../controllers/FollowingController';
import ValidateParams from '../../middlewares/reqParams';
import EmailVerification from '../../workers/VerificationWorker';
import faceBookOauthInfo from '../../helpers/Oauth/facebookOAuth';
import googleRoutes from '../../helpers/Oauth/googleOAuth';
import SocialMedia from '../../controllers/SocialMediaLogin';
import NotificationController from '../../controllers/NotificationController';

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
  verifyEmail,
  notifications,
} = UserController;

const {
  facebook,
  google
} = SocialMedia;

const {
  userIdChecker
} = ValidateParams;

const { isVerified } = EmailVerification;

const {
  token,
  signup
} = Validators;

const { facebookRoutes } = faceBookOauthInfo;


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
router.get('/users/verify', token, verifyEmail);

/**
* Social Media Login
* Redirect the user to Facebook for authentication.  When complete,
* Facebook will redirect the user back to the application at
*/
router.get('/auth/facebook', facebookRoutes.authenticate());

/**
* Facebook will redirect the user to this URL after approval.  Finish the
* authentication process by attempting to obtain an access token.  If
* access was granted, the user will be logged in.  Otherwise,
* authentication has failed.
*/
// eslint-disable-next-line max-len
router.get('/auth/facebook/callback', facebookRoutes.callback(), facebook);

/**
 *  GET /auth/google
Use passport.authenticate() as route middleware to authenticate the
request.  The first step in Google authentication will involve redirecting
the user to google.com.  After authorization, Google will redirect the user
back to this application at /auth/google/callback
*/
router.get('/auth/google', googleRoutes.authenticate());

/**
 * GET /auth/google/callback
Use passport.authenticate() as route middleware to authenticate the
request.  If authentication fails, the user will be redirected back to the
login page.  Otherwise, the primary route function function will be called,
which, in this example, will redirect the user to the home page.
 */
router.get('/auth/google/callback', googleRoutes.callback(), google);
router.get('/notifications', Validators.token, NotificationController.getNotification);


// notifications endpoints ----------------------
router.put('/users/notifications/opt', Validators.token, notifications);

export default router;
