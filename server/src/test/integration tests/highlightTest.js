/* eslint-disable max-len */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../index';

const { expect } = chai;
chai.use(chaiHttp);

let articleId = '';
let userOneToken = '';
let userTwoToken = '';
let returnedHighlightId = '';
const fakeArticleId = '55a9bdd2-a295-4123-af87-90d241d97edd';

describe('Highlights Tests', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/register')
      .send({
        email: 'highlight@mocha.com',
        username: 'highlighter',
        password: 'Mochapassword1',
        confirmPassword: 'Mochapassword1',
      })
      .end((error, response) => {
        if (error) done(error);
        userOneToken = response.body.user.token;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set({ 'x-token': userOneToken, })
      .send({
        title: 'Sample Title',
        description: 'Sample description.',
        content: 'There is really no foo without bar.',
        featuredImg: 'image.com',
        tags: 'foo,bar,philosophy',
      })
      .end((error, response) => {
        if (error) done(error);
        articleId = response.body.article.id;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post('/api/v1/users/register')
      .send({
        email: 'highlight-two@mocha.com',
        username: 'highlighten',
        password: 'Mochapassword1',
        confirmPassword: 'Mochapassword1',
      })
      .end((error, response) => {
        if (error) done(error);
        userTwoToken = response.body.user.token;
        done();
      });
  });

  describe('Posting Highlights Test', () => {
    it('should not highlight an article when the article does not exist', (done) => {
      chai.request(app)
        .post(`/api/v1/articles/${fakeArticleId}/highlights`)
        .set({ 'x-token': userOneToken })
        .send({
          highlight: 'no foo'
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('article not found');
          done();
        });
    });

    it('should not highlight an article without the highlight field in the request body', (done) => {
      chai.request(app)
        .post(`/api/v1/articles/${articleId}/highlights`)
        .set({ 'x-token': userOneToken })
        .send({})
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('highlight is a required field');
          done();
        });
    });

    it('should not highlight an article when the highlight field is empty', (done) => {
      chai.request(app)
        .post(`/api/v1/articles/${articleId}/highlights`)
        .set({ 'x-token': userOneToken })
        .send({
          highlight: '   '
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('highlight must be more than 5 characters');
          done();
        });
    });

    it('should not highlight an article when the highlight isn\'t found in the article', (done) => {
      chai.request(app)
        .post(`/api/v1/articles/${articleId}/highlights`)
        .set({ 'x-token': userOneToken })
        .send({
          highlight: 'this should fail'
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('highlight not found in article');
          done();
        });
    });

    it('should highlight an article successfully without a comment when all requirements are met', (done) => {
      chai.request(app)
        .post(`/api/v1/articles/${articleId}/highlights`)
        .set({ 'x-token': userOneToken })
        .send({
          highlight: 'really no foo'
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('article highlighted successfully');
          returnedHighlightId = response.body.highlightId;
          done();
        });
    });

    it('should highlight an article successfully with a comment when all requirements are met', (done) => {
      chai.request(app)
        .post(`/api/v1/articles/${articleId}/highlights`)
        .set({ 'x-token': userOneToken })
        .send({
          highlight: 'really no foo',
          comment: 'this works'
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('article highlighted successfully');
          returnedHighlightId = response.body.highlightId;
          done();
        });
    });
  });

  describe('Deleting Highlights Test', () => {
    it('should not delete a highlight when the article does not exist', (done) => {
      chai.request(app)
        .delete(`/api/v1/articles/${fakeArticleId}/highlights/${returnedHighlightId}`)
        .set({ 'x-token': userOneToken })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('article not found');
          done();
        });
    });

    it('should not delete a highlight without proper authorization', (done) => {
      chai.request(app)
        .delete(`/api/v1/articles/${articleId}/highlights/${returnedHighlightId}`)
        .set({ 'x-token': userTwoToken })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(403);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('you are not authorized to perform this action');
          done();
        });
    });

    it('should delete a highlight successfully when all requirements are met', (done) => {
      chai.request(app)
        .delete(`/api/v1/articles/${articleId}/highlights/${returnedHighlightId}`)
        .set({ 'x-token': userOneToken })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('highlight removed successfully');
          done();
        });
    });
  });
});
