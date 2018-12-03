import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../../../index';
import Helpers from '../../helpers/index';

const { expect } = chai;
chai.use(chaiHttp);

const payload = {
  id: '8c557dab-b981-4602-979a-19bc16cdb8db',
  email: 'uwahope007',
  username: 'uwahope'
};
const wrongToken = 'dhgnahdbcmajnbscjkjadslkcjbandskjncbakdjshxmncbkamhnbckanbdsnxkchamdmcd';
const fakeToken = Helpers.issueToken(payload);

const testArticle = {
  title: 'this is the title',
  description: 'this is the description',
  content: 'this is the content',
  category: 'life'
};

const data = {};

describe('add articles for test', () => {
  it('Register in a user to get token', (done) => {
    const values = {
      username: 'hopenoldor01',
      email: 'hope@noldor01.com',
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

  it('should add and article', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('X-Token', data.token)
      .send({
        title: 'this is the title',
        description: 'this is the description',
        content: 'this is the content',
        featuredImg: 'ahghgkjag.jpg',
        category: 'life'
      })
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        data.slug = response.body.article.slug;
        done();
      });
  });

  describe('authorize users only', () => {
    it('should require a token for authorisation ', (done) => {
      chai.request(app)
        .post('/api/v1/articles/43d65tf76f7/likes')
        .send(testArticle)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(401);
          done();
        });
    });

    it('should require the correct token for authorisation ', (done) => {
      chai.request(app)
        .post('/api/v1/articles/43d65tf76f7/likes')
        .set('X-Token', wrongToken)
        .send(testArticle)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(401);
          expect(response.body).to.be.an('object');

          done();
        });
    });
  });
});
describe('like an article endpoint', () => {
  it('should return 201 when article is liked', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${data.slug}/likes`)
      .set('X-Token', data.token)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should return 204 when article is unliked', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${data.slug}/likes`)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should return 404 when article is not found', (done) => {
    chai.request(app)
      .post('/api/v1/articles/sdkjsn9wn4sldjd98/likes')
      .set('X-Token', fakeToken)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});
