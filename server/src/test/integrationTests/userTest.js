import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import Helpers from '../../helpers/index';
import app from '../../../../index';

const { expect } = chai;
chai.use(chaiHttp);

const fakeToken = 'eyJhbGciO6IkpXVCJ9.eS00NGEyLThhN2NjI5ODB9.3S6yu-goP8T0iv2MqsD0ffff';

const userOneDetails = {};
let userParams = '';
let userTwoParams = '';

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
  it('should Return 400 for incomplete user details, missing email field in this case', (done) => {
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
        expect(res.body.message).to.equal('email is required');
        done();
      });
  });
  it('should Return 400 for missing user details, missing username field in this case', (done) => {
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
        expect(res.body.message).to.equal('username is required');
        done();
      });
  });
  it('Register a user, when all the required parameters are in good standing', (done) => {
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
  it('should return 409 for signup using existing username', (done) => {
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
        expect(res.body.message).to.equal(`Username ${values.username} already exist`);
        done();
      });
  });
  it('should return 409 for signup using existing email', (done) => {
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
        expect(res.body.message).to.equal(`Email ${values.email} already exist`);
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
        expect(res.body.message).to.equal('Invalid email');
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
        const mes1 = 'Password must be at least 8 characters long and';
        const mes2 = 'must be a combination of characters and numbers';
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(`${mes1} ${mes2}`);
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
        expect(res.body.message).to.equal('Passwords did not match, please try again');
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
        expect(res.body.user.message).to.equal('Please check your email to complete registration');
        userOneDetails.token = res.body.user.token;
        done();
      });
  });
});

it('Should return a token on successful signup', (done) => {
  const values = {
    email: 'fred@noldor.com',
    username: 'fred',
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
        expect(res.body.message).to.equal('email does not exist');
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

  it('Should return 400 for unsuccessful login', (done) => {
    const values = {
      email: 'jane.john@mail.com',
      password: 'password243',
    };
    chai.request(app)
      .post('/api/v1/users/login')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('email or password incorrect');
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
        userParams = res.body.id;
        done();
      });
  });
  it('Should return 200 for successful login', (done) => {
    const values = {
      email: 'fred@noldor.com',
      password: 'password123',
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
        userTwoParams = res.body.id;
        done();
      });
  });

  it('Should return 401 for getting the list of all users', (done) => {
    chai.request(app)
      .get('/api/v1/users/')
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Access denied. No token provided.');
        done();
      });
  });

  it('Should return 400 for getting the list of all users', (done) => {
    chai.request(app)
      .get('/api/v1/users/')
      .set('x-token', fakeToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('invalid token');
        done();
      });
  });

  it('Should return 200 for getting the list of all users', (done) => {
    chai.request(app)
      .get('/api/v1/users/')
      .set('x-token', userOneDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message[0]).to.equal('successfully retrieved users list');
        done();
      });
  });
});

describe('Forgot Password Funtionality', () => {
  it('Should return 400 for not providing user email', (done) => {
    chai.request(app)
      .put('/api/v1/users/forgot/')
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('email is required');
        done();
      });
  });

  it('Should return 400 for not providing valid user email', (done) => {
    const values = {
      email: '     ',
    };
    chai.request(app)
      .put('/api/v1/users/forgot/')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('invalid email');
        done();
      });
  });

  it('Should return 400 for not providing valid user email', (done) => {
    const values = {
      email: 'test@test.com.',
    };
    chai.request(app)
      .put('/api/v1/users/forgot/')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('invalid email');
        done();
      });
  });

  it('Should return 404 for email that does not exist in the database', (done) => {
    const values = {
      email: 'test@authorshaven.co.uk',
    };
    chai.request(app)
      .put('/api/v1/users/forgot/')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Email does not exist');
        done();
      });
  });

  it('Should return 200 for successful email sent', (done) => {
    const values = {
      email: 'jane.john@mail.com',
    };
    chai.request(app)
      .put('/api/v1/users/forgot/')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Check your email for further instructions');
        done();
      });
  });

  it('Should return 200 on successful update', (done) => {
    const decodedUser = jwt.verify(userOneDetails.token, process.env.PRIVATE_KEY);
    const decodedUserOneDetails = decodedUser;
    const payload = {
      id: decodedUserOneDetails.payload.id,
      email: decodedUserOneDetails.payload.email,
    };
    const hash = Helpers.issueToken(payload, '1m');
    const values = {
      password: 'password123',
      confirmPassword: 'password123',
    };
    chai.request(app)
      .post(`/api/v1/users/forgot/${hash}`)
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('password has been updated');
        done();
      });
  });

  it('Should return 404 for user does not exist', (done) => {
    const decodedUser = jwt.verify(userOneDetails.token, process.env.PRIVATE_KEY);
    const decodedUserOneDetails = decodedUser;
    const payload = {
      id: 'b33a1b70-a6de-4032-8f42-59b48846ef40',
      email: decodedUserOneDetails.payload.email,
    };
    const hash = Helpers.issueToken(payload, '1m');
    const values = {
      password: 'password123',
      confirmPassword: 'password123',
    };
    chai.request(app)
      .post(`/api/v1/users/forgot/${hash}`)
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('user does not exist');
        done();
      });
  });

  it('Should return 404 for user does not exist', (done) => {
    const decodedUser = jwt.verify(userOneDetails.token, process.env.PRIVATE_KEY);
    const decodedUserOneDetails = decodedUser;
    const payload = {
      id: decodedUserOneDetails.payload.id,
      email: 'jane.john@mail.co.uk',
    };
    const hash = Helpers.issueToken(payload, '1m');
    const values = {
      password: 'password123',
      confirmPassword: 'password123',
    };
    chai.request(app)
      .post(`/api/v1/users/forgot/${hash}`)
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Email does not match');
        done();
      });
  });

  it('Should return 400 for no password provided', (done) => {
    const decodedUser = jwt.verify(userOneDetails.token, process.env.PRIVATE_KEY);
    const decodedUserOneDetails = decodedUser;
    const payload = {
      id: decodedUserOneDetails.payload.id,
      email: decodedUserOneDetails.payload.email,
    };
    const hash = Helpers.issueToken(payload, '1m');
    const values = {
    };
    chai.request(app)
      .post(`/api/v1/users/forgot/${hash}`)
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('password field is required');
        done();
      });
  });

  it('Should return 400 for not confirming password field', (done) => {
    const decodedUser = jwt.verify(userOneDetails.token, process.env.PRIVATE_KEY);
    const decodedUserOneDetails = decodedUser;
    const payload = {
      id: decodedUserOneDetails.payload.id,
      email: decodedUserOneDetails.payload.email,
    };
    const hash = Helpers.issueToken(payload, '1m');
    const values = {
      password: 'password123',
    };
    chai.request(app)
      .post(`/api/v1/users/forgot/${hash}`)
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('confirmPassword field is required');
        done();
      });
  });

  it('Should return 400 for invalid password combination', (done) => {
    const decodedUser = jwt.verify(userOneDetails.token, process.env.PRIVATE_KEY);
    const decodedUserOneDetails = decodedUser;
    const payload = {
      id: decodedUserOneDetails.payload.id,
      email: decodedUserOneDetails.payload.email,
    };
    const hash = Helpers.issueToken(payload, '1m');
    const values = {
      password: 'password',
      confirmPassword: 'password',
    };
    chai.request(app)
      .post(`/api/v1/users/forgot/${hash}`)
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        const mes1 = 'Password must be at least 8 characters long and';
        const mes2 = 'must be a combination of characters and numbers';
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(`${mes1} ${mes2}`);
        done();
      });
  });

  it('Should return 400 for non matching password', (done) => {
    const decodedUser = jwt.verify(userOneDetails.token, process.env.PRIVATE_KEY);
    const decodedUserOneDetails = decodedUser;
    const payload = {
      id: decodedUserOneDetails.payload.id,
      email: decodedUserOneDetails.payload.email,
    };
    const hash = Helpers.issueToken(payload, '1m');
    const values = {
      password: 'password123',
      confirmPassword: 'password234',
    };
    chai.request(app)
      .post(`/api/v1/users/forgot/${hash}`)
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('passwords does not match');
        done();
      });
  });
});

describe('User Profile test', () => {
  it('Should return 200(OK) on succefully returning a users profile', (done) => {
    const id = userParams;
    chai.request(app)
      .get(`/api/v1/users/${id}/profiles`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Retrieval successful');
        done();
      });
  });
  it('Should return 404(Not Found) if user does not exists', (done) => {
    chai.request(app)
      .get('/api/v1/users/b91398d5-53ae-4600-a301-35603b28a4ff/profiles')
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('User does not exist');
        done();
      });
  });
  it('Should return 401(Unauthorized) if an unauthorized user tries to edit', (done) => {
    const id = userParams;
    const values = {
      firstName: 'Jane',
      username: 'Janny',
      bio: 'This is my test'
    };
    chai.request(app)
      .put(`/api/v1/users/${id}/profiles`)
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Access denied. No token provided.');
        done();
      });
  });
  it('Should return 205(Reset Content) on succesful edit', (done) => {
    const id = userParams;
    const values = {
      firstName: 'Jane',
      username: 'Fanny',
      bio: 'This is my test',
      avatar: `https://res.cloudinary.com/dstvcmycn/image/upload/v1541530550
      /Author%27s%20Haven/qtvmhyx8k4pfimdtsucs.jpg`
    };
    chai.request(app)
      .put(`/api/v1/users/${id}/profiles`)
      .set('x-token', userOneDetails.token)
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(205);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Your edits have been saved');
        done();
      });
  });
  it('Should return 404(Not Found) if user does not exist', (done) => {
    const values = {
      firstName: 'Jane',
      username: 'Janny',
      bio: 'This is my test'
    };
    chai.request(app)
      .put('/api/v1/users/1432c4df-2f33-4b93-84f8-b4ab7823cc00/profiles')
      .send(values)
      .set('x-token', userOneDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('User does not exist');
        done();
      });
  });
});

describe('Soft Delete users', () => {
  it('Should return 204(No Content) on successful delete of an authorized user', (done) => {
    const id = userParams;
    chai.request(app)
      .delete(`/api/v1/users/${id}/deactivate`)
      .set('x-token', userOneDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(204);
        done();
      });
  });
  it('Should return 404(Not Found) if user does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/users/361c55fa-40cf-41d8-bfee-5e1b4857e583/deactivate')
      .set('x-token', userOneDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('user not found');
        done();
      });
  });
  it('Should return 401(Unauthorized) if user is unauthorized', (done) => {
    const id = userTwoParams;
    chai.request(app)
      .delete(`/api/v1/users/${id}/deactivate`)
      .set('x-token', userOneDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('user not found');
        done();
      });
  });
});

export default userOneDetails;
