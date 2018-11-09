import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../../../index';

const { expect } = chai;
chai.use(chaiHttp);

const value = { rateValue: 3 };
const value0 = { rateValue: 0 };
const valueNull = {};
const value8 = { rateValue: 8 };

const data = {};

const wrongToken = 'dhgnahdbcmajnbscjkjadslkcjbandskjncbakdjshxmncbkamhnbckanbdsnxkchamdmcd';

describe('Article Rating test scripts', () => {
  it('Register a user, when all the required parameters is in good standing', (done) => {
    const values = {
      email: 'meeky88.ae@mail.com',
      username: 'meeky88',
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
  it('Register a 2nd user, when all the required parameters is in good standing', (done) => {
    const values = {
      email: 'jane@noldor.com',
      username: 'jane',
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
        done();
      });
  });
  const api = '/api/v1/articles/';
  it('should return 201 if article is added successfully', (done) => {
    chai.request(app)
      .post(api)
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
        data.id = response.body.article.id;
        data.slug = response.body.article.slug;
        done();
      });
  });
  it('should return 404 if article is not found ', (done) => {
    chai.request(app)
      .post('/api/v1/articles/ratings/8c557dab-b981-4602-979a-19bc16cdb8eb')
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        done();
      });
  });
  it('should return 404 if article is not published ', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/ratings/${data.id}`)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);

        done();
      });
  });
  it('should return a 201', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${data.slug}/publish`)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should require a token for authorisation', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/ratings/${data.id}`)
      .set('X-Token', wrongToken)
      .send(value)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should return a 201 for rating published article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/ratings/${data.id}`)
      .set('X-Token', data.token)
      .send(value)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should return a 403 for article already rated by user', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/ratings/${data.id}`)
      .set('X-Token', data.token)
      .send(value)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(403);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should return a 403 for rating value outside range bound of [1 - 5] below 1', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/ratings/${data.id}`)
      .set('X-Token', data.token)
      .send(value0)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(403);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should return a 403 for rating value outside range bound of [1 - 5] above 5', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/ratings/${data.id}`)
      .set('X-Token', data.token)
      .send(value8)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(403);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should return a 403 if there is no rate value', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/ratings/${data.id}`)
      .set('X-Token', data.token2)
      .send(valueNull)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(403);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});
