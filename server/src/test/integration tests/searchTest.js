import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('Search Initializations', () => {
  let userToken = '';
  let articleSlug = '';

  before((done) => {
    chai.request(app)
      .post('/api/v1/users/register')
      .send({
        email: 'test@mocha.com',
        username: 'userone',
        password: 'Mochapassword1',
        confirmPassword: 'Mochapassword1',
      })
      .end((error, response) => {
        if (error) done(error);
        userToken = response.body.user.token;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set({ 'x-token': userToken, })
      .send({
        title: 'Sample Title',
        description: 'Sample description.',
        content: 'There is really no foo without bar.',
        featuredImg: 'image.com',
      })
      .end((error, response) => {
        if (error) done(error);
        articleSlug = response.body.article.slug;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .put(`/api/v1/articles/${articleSlug}/publish`)
      .set({ 'x-token': userToken, })
      .send({
        published: true,
      })
      .end((error) => {
        if (error) done(error);
        done();
      });
  });


  describe('Search Articles Without Filters', () => {
    it('should return an array of results when successful', (done) => {
      chai.request(app)
        .post('/api/v1/search')
        .send({
          keywords: 'bar',
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('articles matching that search term found');
          done();
        });
    });

    it('should fail when queried without keyword', (done) => {
      chai.request(app)
        .post('/api/v1/search')
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error.msg).to.equal('search keyword must be provided');
          done();
        });
    });

    it('should return an empty object when keywords aren\'t found', (done) => {
      chai.request(app)
        .post('/api/v1/search')
        .send({
          keywords: 'baritone',
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error.msg).to.be.equal('no article with that search term found');
          done();
        });
    });
  });

  describe('Search Articles With Filters', () => {
    it('should return an array of results when successful', (done) => {
      chai.request(app)
        .post('/api/v1/search?author=userone')
        .send({
          keywords: 'bar',
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('articles matching that search term found');
          done();
        });
    });

    it('should return an empty object when keywords aren\'t found', (done) => {
      chai.request(app)
        .post('/api/v1/search?author=erroruser')
        .send({
          keywords: 'bar',
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.error.msg).to.be.equal('no article with that search term found');
          done();
        });
    });
  });
});
