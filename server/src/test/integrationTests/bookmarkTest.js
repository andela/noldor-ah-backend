import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../../../index';

const { expect } = chai;
chai.use(chaiHttp);

const wrongToken = 'dhgnahdbcmajnbscjkjadslkcjbandskjncbakdjshxmncbkamhnbckanbdsnxkchamdmcd';
const fakeSlug = 'this-is-the-title-7f261883cy59';
const data = {};
const category = 'technology';

describe('BookMark an article', () => {
  it('should return 200 to login an existing user', (done) => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'papa@smurf.com',
        password: 'BigBlue5ky'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.token).to.be.a('string');
        expect(res.header['x-token']).to.be.a('string');
        expect(res.body.message).to.equal('successfully logged in');
        data.userOneDetails = res.body;
        done();
      });
  });

  it('should return 201 if article is added successfully', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('X-token', data.userOneDetails.token)
      .send({
        title: 'this is the title',
        description: 'this is the description',
        content: 'this is the content',
        featuredImg: 'ahghgkjag.jpg',
        tags: 'bars,foos,philosophical,smart',
        category,
      })
      .end((error, res) => {
        if (error) done(error);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        data.userOneDetails.article = res.body.article;
        done();
      });
  });

  it('should return 401 for no token provided', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${data.userOneDetails.article.slug}/bookmark`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Access denied. No token provided.');
        done();
      });
  });

  it('should return 401 for Invalid token', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${data.userOneDetails.article.slug}/bookmark`)
      .set('x-token', wrongToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('invalid token');
        done();
      });
  });
  it('should return 200 for bookmarked article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${data.userOneDetails.article.slug}/bookmark`)
      .set('x-token', data.userOneDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Article has been bookmarked');
        done();
      });
  });

  it('should return 200 for already bookmarked article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${data.userOneDetails.article.slug}/bookmark`)
      .set('x-token', data.userOneDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('You already bookmarked this article');
        done();
      });
  });

  it('should return 404 for article not found', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${fakeSlug}/bookmark`)
      .set('x-token', data.userOneDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Article not found');
        done();
      });
  });

  it('should return 401 for /GET bookmarks', (done) => {
    chai.request(app)
      .get('/api/v1/users/articles/bookmark')
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Access denied. No token provided.');
        done();
      });
  });

  it('should return 401 for /GET bookmarks', (done) => {
    chai.request(app)
      .get('/api/v1/users/articles/bookmark')
      .set('x-token', wrongToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('invalid token');
        done();
      });
  });

  it('should return 200 for /GET bookmarks', (done) => {
    chai.request(app)
      .get('/api/v1/users/articles/bookmark')
      .set('x-token', data.userOneDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('successfully retrieved user\'s bookmarked articles');
        done();
      });
  });

  it('should return 401 /DELETE for no token provided', (done) => {
    chai.request(app)
      .delete(`/api/v1/articles/${data.userOneDetails.article.slug}/bookmark`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Access denied. No token provided.');
        done();
      });
  });

  it('should return 401 /DELETE for Invalid token', (done) => {
    chai.request(app)
      .delete(`/api/v1/articles/${data.userOneDetails.article.slug}/bookmark`)
      .set('x-token', wrongToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('invalid token');
        done();
      });
  });
  it('should return 200 /DETETE to remove bookmark', (done) => {
    chai.request(app)
      .delete(`/api/v1/articles/${data.userOneDetails.article.slug}/bookmark`)
      .set('x-token', data.userOneDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('successfully removed bookmark');
        done();
      });
  });

  it('should return 404 /DELETE for already deleted bookmark', (done) => {
    chai.request(app)
      .delete(`/api/v1/articles/${data.userOneDetails.article.slug}/bookmark`)
      .set('x-token', data.userOneDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('This article is not bookmarked.');
        done();
      });
  });

  it('should return 404 on /GET for no bookmarks', (done) => {
    chai.request(app)
      .get('/api/v1/users/articles/bookmark')
      .set('x-token', data.userOneDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('You have no bookmark');
        done();
      });
  });
});
