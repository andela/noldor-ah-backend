/**
 * https://www.npmjs.com/package/nock
 */
import chai from 'chai';
import nock from 'nock';
import SocialLogin from '../../workers/oauthQueries';
import app from '../../../../index';

const {
  faceBookLogin,
  googleLogin
} = SocialLogin;

const { expect } = chai;

const accessToken = 'issuedToken';
const refreshToken = 'issuedToken';
const profile = {
  emails: [{ value: 'useremail@gmail.com' }],
  name: {
    familyName: 'Deco',
    givenName: 'Chinedu'
  },
  photos: [{ value: 'imageUrl' }]
};


describe('Social media login Test', () => {
  before((done) => {
    nock('https://www.facebook.com/')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, 'Facebook login successful');

    nock('https://www.google.com/')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, 'Google login successful', {
        Location: '/'
      });
    done();
  });
  describe('Test social media sync', () => {
    it('Should be a function', () => {
      expect(faceBookLogin).to.be.a('function');
      expect(googleLogin).to.be.a('function');
    });
    it('Should return 200 on succefully facebook login', (done) => {
      chai.request(app)
        .get('/api/v1/auth/facebook')
        .end((err, res) => {
          if (err) done();
          expect(res.status).to.equal(200);
          expect(res.text).to.equal('Facebook login successful');
          done();
        });
    });
    it('Should return 200 on succefully google login', (done) => {
      chai.request(app)
        .get('/api/v1/auth/google')
        .end((err, res) => {
          if (err) done();
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  setTimeout(() => {
    describe('Database query functions', () => {
      it('should make database', (done) => {
        const callBackFuntion = faceBookLogin(accessToken, refreshToken, profile, done);
        expect(callBackFuntion).to.be.equal(undefined);
        done();
      });
      it('should return undefined', (done) => {
        const callBackFuntion = googleLogin(accessToken, refreshToken, profile, done);
        expect(callBackFuntion).to.be.equal(undefined);
        done();
      });
    });
  }, 1000);
});
