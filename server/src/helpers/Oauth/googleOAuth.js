import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import socialMediaConfig from '../../db/config/socialMediaConfig';
import SocialLogin from '../../workers/oauthQueries';

const {
  google
} = socialMediaConfig;

const {
  googleLogin
} = SocialLogin;

passport.use(new GoogleStrategy(
  {
    clientID: google.clientID,
    clientSecret: google.clientSecret,
    callbackURL: google.callbackURL
  },
  (accessToken, refreshToken, profile, done) => {
    const {
      displayName,
      emails
    } = profile;

    googleLogin(displayName, emails[0].value, null, done);
  }
));

const googleRoutes = {
  authenticate: () => passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read']
  }),
  callback: () => passport.authenticate('google', { session: false })
};

export default googleRoutes;
