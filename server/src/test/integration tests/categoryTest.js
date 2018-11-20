import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../index';

chai.use(chaiHttp);
const { expect } = chai;
const api = '/api/v1/articles';
const article = {
  title: 'Noldor is travelling',
  description: 'Helpful tips and tricks from an experienced adventurer.',
  content: 'this is the content',
  featuredImg: 'blue.jpg',
  tags: 'travel,life',
  category: 'error'
};

describe('Category Tests', () => {
  let userToken = '';

  before((done) => {
    chai.request(app)
      .post('/api/v1/users/register')
      .send({
        email: 'papa@smurf.com',
        username: 'papasmurf',
        password: 'BigBlue5ky',
        confirmPassword: 'BigBlue5ky',
      })
      .end((error, response) => {
        if (error) done(error);
        userToken = response.body.user.token;
        done();
      });
  });

  describe('Adding a category to an article', () => {
    it('should return 400 if the selected category does not exist', (done) => {
      chai.request(app)
        .post(api)
        .set('x-token', userToken)
        .send(article)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('selected category does not exist');
          expect(response.body.availableCategories).to.be.an('array');
          done();
        });
    });

    it('should return 201 if the selected category exists', (done) => {
      article.category = 'travel';
      chai.request(app)
        .post(api)
        .set('x-token', userToken)
        .send(article)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('article was added successfully');
          done();
        });
    });
  });
  describe('Getting all articles of a category', () => {
    it('should return all articles of a category', (done) => {
      chai.request(app)
        .get('/api/v1/categories/life/articles')
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('retrieved all articles of life');
          done();
        });
    });

    it('should return a different response when the category has no articles yet', (done) => {
      chai.request(app)
        .get('/api/v1/categories/travel/articles')
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('travel does not have any articles yet');
          done();
        });
    });

    it('should throw an error when the queried category does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/categories/error/articles')
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('category does not exist');
          done();
        });
    });
  });
});
