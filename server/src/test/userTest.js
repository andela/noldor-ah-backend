import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('Sample API for test', () => {
  it('should return a welcome message', (done) => {
    chai.request(app)
      .get('/')
      .end((error, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Signup validation test', () => {
  it('should return 409 (Conflict) POST /uesrs for signup using existing email', (done) => {
    const values = {
      name: 'jane doe',
      email: 'jane.doe@mail.com',
      username: 'meeky00',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/users')
      .send(values)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.error.email).to.equal(`Email ${values.email} aready exist`);
        done();
      });
  });
  it('should return 409 (Conflict) POST /uesrs for signup using existing username', (done) => {
    const values = {
      name: 'jane doe',
      email: 'jane.doe8@mail.com',
      username: 'meeky',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/users')
      .send(values)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.error.username).to.equal(`Username ${values.username} aready exist`);
        done();
      });
  });
  it('should Return 400 (Bad request) for incomplete user details, missing email field in this case', (done) => {
    const values = {
      name: 'jane doe',
      email: '',
      username: 'jane20',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/users')
      .send(values)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error.email).to.equal('email is required');
        done();
      });
  });
  it('should Return 400 (Bad request) for missing user details, missing username field in this case', (done) => {
    const values = {
      name: 'jane doe',
      email: 'jane00@mail.com',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/users')
      .send(values)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error.username).to.equal('username is required');
        done();
      });
  });
  it('Login an existing user, when all the required parameters is in good standing', (done) => {
    const values = {
      name: 'jane doe',
      email: 'jane.doe0@mail.com',
      username: 'meeky00',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/users')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('This is the POST signup user route');
        done();
      });
  });
  it('Should return 400 for invalid emails', (done) => {
    const values = {
      name: 'jane doe',
      email: 'jane.doe0@mail.com.',
      username: 'meeky00',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/users')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.error.email).to.equal('Invalid email');
        done();
      });
  });
  it('Should return 400 for invalid passwords', (done) => {
    const values = {
      name: 'jane doe',
      email: 'jane.doe0@mail.com.',
      username: 'meeky00',
      password: 'password',
      confirmPassword: 'password'
    };
    chai.request(app)
      .post('/users')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.error.password).to.equal('Password must be atleast 8 characters long and must be a combination of characters and numbers');
        done();
      });
  });
  it('Should return 400 for non matching passwords', (done) => {
    const values = {
      name: 'jane doe',
      email: 'jane.doe0@mail.com.',
      username: 'meeky00',
      password: 'password234',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/users')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.error.matchPass).to.equal('Passwords did not match, please try again');
        done();
      });
  });

  it('Should return a token on successful signup', (done) => {
    const values = {
      firstName: 'Janet',
      lastName: 'Doe',
      email: 'jane.John@mail.com',
      username: 'JaneJanet',
      password: 'password234',
      confirmPassword: 'password234',
      bio: 'This is a test bio description',
      avatarUrl: 'http://www.google.com',
    };
    chai.request(app)
      .post('/user/register')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.token).to.be.a('string');
        expect(res.body.message).to.equal('Registration successful, token issued');
        done();
      });
  });
});
