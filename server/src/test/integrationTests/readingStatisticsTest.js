import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../../../index';
import ReadingStatsWorker from '../../workers/ReadingStatsWorker';
import helpers from '../../helpers/index';

const { expect } = chai;
chai.use(chaiHttp);

const data = {};
data.slugFake = 'i-am-jane-d6ca17b9aa1a';

const payload = {
  id: '4340f59e-8ce0-432f-bb04-60468fc34e89',
  email: 'uwahope007',
  username: 'uwahope'
};

const fakeToken = helpers.issueToken(payload);

describe('Users reading statistics test', () => {
  it('Login a user', (done) => {
    const values = {
      email: 'meeky00.ae@gmail.com',
      password: 'Mochapassword1'
    };
    chai.request(app)
      .post('/api/v1/users/login')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        data.token = res.body.token;
        data.userId = res.body.id;
        done();
      });
  });
  it('should return 201 if article is added successfully', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('X-Token', data.token)
      .send({
        title: 'this is the title',
        description: 'this is the description',
        content: 'this is the content',
        featuredImg: 'ahghgkjag.jpg',
        tags: 'bars,foos,philosophical,smart',
        category: 'life',
      })
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('article was added successfully');
        data.slug = response.body.article.slug;
        data.articleId = response.body.article.id;
        data.response = response;
        done();
      });
  });
  it('should return a 401 if token is not provided', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/${data.slug}`)
      .end((error, response) => {
        if (error) done(error);
        ReadingStatsWorker.createReadingsStats(data.id, data.id);
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should return a 200 if published successfully', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${data.slug}/publish`)
      .set('x-token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should return a 401 if token is invalid', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/${data.slug}`)
      .set('x-token', data.slug)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(401);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should return a 200 if article is not found', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/${data.slug}`)
      .set('x-token', `${data.token}`)
      .end((error, response) => {
        if (error) done(error);
        ReadingStatsWorker.createReadingsStats(data.userId, data.articleId);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should return a 404 if article is not found', (done) => {
    chai.request(app)
      .get(`/api/v1/articles/${data.slugFake}`)
      .set('x-token', `${data.token}`)
      .end((error, response) => {
        if (error) done(error);
        ReadingStatsWorker.createReadingsStats(data.userId, data.articleId);
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});
describe('Get user statistics tests', () => {
  it('return users reading stats', (done) => {
    chai.request(app)
      .get(`/api/v1/users/${data.userId}/stats`)
      .set('x-token', data.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        data.token = res.body.token;
        done();
      });
  });
  it('return 404 if stats is not found', (done) => {
    chai.request(app)
      .get(`/api/v1/users/${data.userId}/stats`)
      .set('x-token', fakeToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
