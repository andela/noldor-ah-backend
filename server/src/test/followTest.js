import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../../index';


const { expect } = chai;
chai.use(chaiHttp);

const data = {};

describe('Create a user for test', () => {
  it('Register a user, when all the required parameters is in good standing', (done) => {
    const values = {
      email: 'follow@noldor.com',
      username: 'follow01',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/api/v1/users/register')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.user.success).to.equal(true);
        data.token = res.body.user.token;
        data.user = res.body.user.username;
        done();
      });
  });
  it('Register a 2nd user, when all the required parameters is in good standing', (done) => {
    const values = {
      email: 'follow2@noldor.com',
      username: 'follow2',
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
        data.token2 = res.body.user.token;
        data.user2 = res.body.user.username;
        done();
      });
  });
});
describe('get a user following', () => {
  it(' it should return an object ', (done) => {
    chai.request(app)
      .get(`/api/v1/users/${data.user}/followings`)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');

        done();
      });
  });

  it(' it should return an object ', (done) => {
    chai.request(app)
      .get('/api/v1/users/xuxuxuyashuaysb/followings')
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');

        done();
      });
  });
});

describe('get a user following', () => {
  it(' it should return an object ', (done) => {
    chai.request(app)
      .get(`/api/v1/users/${data.user}/followers`)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');

        done();
      });
  });

  it(' it should return an object ', (done) => {
    chai.request(app)
      .get('/api/v1/users/xuxuxuyashuaysb/followers')
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');

        done();
      });
  });
});

describe('follow a user', () => {
  it(' it should return 403 if user follows self ', (done) => {
    chai.request(app)
      .post(`/api/v1/users/${data.user}/follow`)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(403);
        expect(response.body).to.be.an('object');

        done();
      });
  });

  it(' it should return a 404 if user is not found ', (done) => {
    chai.request(app)
      .post('/api/v1/users/xuxuxuyashuaysb/follow')
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');

        done();
      });
  });
  it(' it should return 201 to follow ', (done) => {
    chai.request(app)
      .post(`/api/v1/users/${data.user2}/follow`)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');

        done();
      });
  });

  it(' it should return 200 if already following', (done) => {
    chai.request(app)
      .post(`/api/v1/users/${data.user2}/follow`)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');

        done();
      });
  });

  it(' it should return a 200 to get followings ', (done) => {
    chai.request(app)
      .get(`/api/v1/users/${data.user}/followings`)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');

        done();
      });
  });

  it(' it should return a 200 to get followings ', (done) => {
    chai.request(app)
      .get(`/api/v1/users/${data.user2}/followers`)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');

        done();
      });
  });

  it(' it should return 403 if user follows self', (done) => {
    chai.request(app)
      .delete(`/api/v1/users/${data.user}/unfollow`)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(403);

        done();
      });
  });

  it(' it should return 204 to unfollow ', (done) => {
    chai.request(app)
      .delete(`/api/v1/users/${data.user2}/unfollow`)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(204);

        done();
      });
  });
  it(' it should return 200 if already unfollowed ', (done) => {
    chai.request(app)
      .delete(`/api/v1/users/${data.user2}/unfollow`)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);

        done();
      });
  });
  it(' it should return 200 if already unfollowed ', (done) => {
    chai.request(app)
      .delete(`/api/v1/users/${data.user2}/unfollow`)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);

        done();
      });
  });
});
describe('get a user following', () => {
  it(' it should return 200 if already unfollowed ', (done) => {
    chai.request(app)
      .delete('/api/v1/users/hgfhgfyh/unfollow')
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);

        done();
      });
  });
});
