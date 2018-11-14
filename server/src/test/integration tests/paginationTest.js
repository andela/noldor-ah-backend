import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../../../index';

const { expect } = chai;
chai.use(chaiHttp);

const data = {};

describe('GET all articles endpoint', () => {
  it('Register a user, when all the required parameters is in good standing', (done) => {
    const values = {
      email: 'hopes00@noldor.com',
      username: 'elpiss00',
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
        data.token = res.body.user.token;
        done();
      });
  });
  it('should return 200 if article is added successfully', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('X-Token', data.token)
      .send({
        title: 'this is the title',
        description: 'this is the description',
        content: 'this is the content',
        featuredImg: 'ahghgkjag.jpg'

      })
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('Should return 200 for successful pagination', (done) => {
    chai.request(app)
      .get('/api/v1/articles/page/1')
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('Should return 404 for invalid page number', (done) => {
    chai.request(app)
      .get('/api/v1/articles/page')
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('Should return 404 for invalid page number', (done) => {
    chai.request(app)
      .get('/api/v1/articles/page/-1')
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('Should return 404 for 0 page number', (done) => {
    chai.request(app)
      .get('/api/v1/articles/page/0')
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('Should return 404 for invalid page number', (done) => {
    chai.request(app)
      .get('/api/v1/articles/page/a')
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('Should return 404 for invalid page number', (done) => {
    chai.request(app)
      .get('/api/v1/articles/page/-a')
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('Should return 404 for invalid page number', (done) => {
    chai.request(app)
      .get('/api/v1/articles/page/-')
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});
