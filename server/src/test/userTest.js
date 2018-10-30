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
  it('should Return 400 (Bad request) for incomplete user details, missing email field in this case', (done) => {
    const values = {
      email: '',
      username: 'jane20',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/api/v1/users/register')
      .send(values)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error.email).to.equal('email is required');
        done();
      });
  });
  it('should Return 400 (Bad request) for POST /users/register missing user details, missing username field in this case', (done) => {
    const values = {
      email: 'jane00@mail.com',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/api/v1/users/register')
      .send(values)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error.username).to.equal('username is required');
        done();
      });
  });
  it('Register a user, when all the required parameters is in good standing', (done) => {
    const values = {
      email: 'jane.doe@mail.com',
      username: 'meeky',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/api/v1/users/register')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.user.success).to.equal(true);
        done();
      });
  });
  it('should return 409 (Conflict) POST /users/register for signup using existing username', (done) => {
    const values = {
      email: 'john.doe00@gmail.com',
      username: 'meeky',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/api/v1/users/register')
      .send(values)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal(`Username ${values.username} aready exist`);
        done();
      });
  });
  it('should return 409 (Conflict) for POST /users/register for signup using existing email', (done) => {
    const values = {
      email: 'jane.doe@mail.com',
      username: 'meeky00',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/api/v1/users/register')
      .send(values)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal(`Email ${values.email} aready exist`);
        done();
      });
  });
  it('Should return 400 for invalid emails', (done) => {
    const values = {
      email: 'jane.doe0@mail.com.',
      username: 'meekye',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/api/v1/users/register')
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
      email: 'jane.doe0@mail.com',
      username: 'meeky99',
      password: 'password',
      confirmPassword: 'password'
    };
    chai.request(app)
      .post('/api/v1/users/register')
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
      email: 'jane.doe0@mail.com',
      username: 'meeky88',
      password: 'password234',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/api/v1/users/register')
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
      email: 'jane.John@mail.com',
      username: 'JaneJanet',
      password: 'password234',
      confirmPassword: 'password234',
    };
    chai.request(app)
      .post('/api/v1/users/register')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.user.token).to.be.a('string');
        expect(res.body.user.message).to.equal('registration successful');
        done();
      });
  });
});

describe('Login validation test', () => {
  it('Should return 404 for unregistered user on login', (done) => {
    const values = {
      email: 'anasey@gmail.com',
      password: 'password12',
    };
    chai.request(app)
      .post('/api/v1/users/login')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('email or password incorrect');
        done();
      });
  });

  it('Should return 401 for invalid email on login', (done) => {
    const values = {
      email: 'anasey@gmail.com.',
      password: 'password12',
    };
    chai.request(app)
      .post('/api/v1/users/login')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.error.email).to.equal('Invalid email');
        done();
      });
  });

  it('Should return 200 for successful login', (done) => {
    const values = {
      email: 'jane.john@mail.com',
      password: 'password234',
    };
    chai.request(app)
      .post('/api/v1/users/login')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.token).to.be.a('string');
        expect(res.header['x-token']).to.be.a('string');
        expect(res.body.message).to.equal('successfully logged in');
        done();
      });
  });
});
