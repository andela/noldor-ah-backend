/**
 * http://www.passportjs.org/docs/facebook/
 *https://medium.com/@tkssharma/authentication-using-passport-js-social-auth-with-node-js-1e1ec7086ded
 https://www.djamware.com/post/59a6257180aca768e4d2b132/node-express-passport-facebook-twitter-google-github-login
 */
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import socialMediaConfig from '../../db/config/socialMediaConfig';
import SocialLogin from '../../workers/oauthQueries';

const {
  facebook
} = socialMediaConfig;

const {
  faceBookLogin
} = SocialLogin;

passport.use(new FacebookStrategy(
  {
    clientID: facebook.clientID,
    clientSecret: facebook.clientSecret,
    callbackURL: facebook.callbackURL,
    profileFields: ['id', 'displayName', 'name', 'photos', 'email'],

  },
  (req, accessToken, refreshToken, profile, done) => {
    const {
      id,
      displayName,
      emails
    } = profile;

    faceBookLogin(id, displayName, emails[0].value, null, done);
  }
));

const facebookRoutes = {
  authenticate: () => passport.authenticate('facebook', { scope: ['email'] }),
  callback: () => passport.authenticate('facebook', { session: false })
};

export default { facebookRoutes };
