import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../../index';
import testdata from '../helpers/tests/articles';
import token from '../helpers/tests/tokenGenerator';

const { expect } = chai;
chai.use(chaiHttp);

const { userToken, user2Token, wrongToken } = token;

describe('POST endpoint for creating articles', () => {
  const api = '/api/articles';
  it('should require a token for authorisation ', (done) => {
    chai.request(app)
      .post(api)
      .send(testdata.goodArticle)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.errors).to.be.an('object');
        expect(response.body.errors.message).to.equal('You are unauthorised to make this request');
        done();
      });
  });

  it('should require the correct token for authorisation ', (done) => {
    chai.request(app)
      .post(api)
      .set('Authorization', wrongToken)
      .send(testdata.testArticle)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.errors).to.be.an('object');
        expect(response.body.errors.message).to.equal('Could not authenticate the provided token');
        done();
      });
  });

  it('should not add an article with no title', (done) => {
    const noTitleArticle = {
      title: '',
      description: 'this is the description',
      content: 'this is the content'
    };
    chai.request(app)
      .post(api)
      // .set('Authorization', userToken)
      .send(noTitleArticle)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });


  it('should not add an article with no body ', (done) => {
    const noContentArticle = {
      title: 'this is the title',
      description: 'this is a description',
      content: ''
    };
    chai.request(app)
      .post(api)
      .send(noContentArticle)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should not add an article with no description ', (done) => {
    const noDescriptionArticle = {
      title: 'this is the title',
      description: '',
      content: 'this is the content'
    };
    chai.request(app)
      .post(api)
      // .set('Authorization', userToken)
      .send(noDescriptionArticle)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });


  it('should return 201 if article is added successfully', (done) => {
    const testArticle = {
      title: 'this is the title',
      description: 'this is the description',
      content: 'this is the content'
    };
    chai.request(app)
      .post(api)
      // .set('Authorization', userToken)
      .send(testArticle)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});
describe('GET all articles endpoint', () => {
  it('should return a 200', (done) => {
    chai.request(app)
      .get('/api/articles')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});
describe('GET endpoint for an article', () => {
  it('should return an 200 if found', (done) => {
    chai.request(app)
      .get(`/api/articles/${testdata.correctSlug}`)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should return 404 if article is not found ', (done) => {
    const noQuestionApi = `/api/articles/${testdata.wrongSlug}`;
    chai.request(app)
      .get(noQuestionApi)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.errors).to.be.an('object');

        done();
      });
  });
});
describe('Update endpoint for articles', () => {
  const article = {
    title: 'this is a new article',
    content: 'this is a new content'
  };
  const api = `/api/v1/articles/${testdata.correctSlug}`;
  it('should require a token', (done) => {
    chai.request(app)
      .put(api)
      .send(article)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.errors).to.be.an('object');
        done();
      });
  });
  it('should require a correct token', (done) => {
    chai.request(app)
      .put(api)
      .set('Authorization', wrongToken)
      .send(article)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.errors).to.be.an('object');
        done();
      });
  });

  it('should not update an article with no title', (done) => {
    chai.request(app)
      .put(api)
      .set('Authorization', userToken)
      .send(testdata.noTitleArticle)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.errors).to.be.an('object');
        done();
      });
  });


  it('should not update an article with no body ', (done) => {
    chai.request(app)
      .put(api)
      .set('Authorization', userToken)
      .send(testdata.badArticle.noBodyArticle)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.errors).to.be.an('object');
        done();
      });
  });

  it('should not update an article with no description ', (done) => {
    chai.request(app)
      .put(api)
      .set('Authorization', userToken)
      .send(testdata.badArticle.noDescriptionArticle)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.errors).to.be.an('object');
        done();
      });
  });

  it('should return a 404 if article does not exist', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${testdata.wrongSlug}`)
      .set('Authorization', userToken)
      .send(testdata.badArticle.noDescriptionArticle)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.errors).to.be.an('object');
        done();
      });
  });


  it('should return a 201', (done) => {
    chai.request(app)
      .put(api)
      .set('Authorization', userToken)
      .send(article)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should return a 401 if user is not author', (done) => {
    chai.request(app)
      .put(api)
      .set('Authorization', user2Token)
      .send(article)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.errors).to.be.an('object');
        done();
      });
  });
});
describe('DELETE endpoint for an article', () => {
  it('should require a token ', (done) => {
    chai.request(app)
      .delete(`/api/v1/articles/${testdata.correctSlug}`)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.errors).to.equal.an('object');
        done();
      });
  });

  it('should require a correct token ', (done) => {
    chai.request(app)
      .delete(`/api/v1/articles/${testdata.goodArticle.slug}`)
      .set('Authorization', wrongToken)
      .send(testdata.goodArticle.body)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.errors).to.equal('object');
        done();
      });
  });

  it('should return a status 200', (done) => {
    chai.request(app)
      .delete(`/api/v1/articles/${testdata.correctSlug}`)
      .set('Authorization', userToken)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.equal('object');
        done();
      });
  });

  it('should return 404 if article does not exist ', (done) => {
    chai.request(app)
      .delete(`/api/v1/articles/${testdata.badArticle.slug}`)
      .set('Authorization', userToken)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.errors).to.equal.an('object');
        done();
      });
  });

  it('should returns 401 if article is for another user ', (done) => {
    chai.request(app)
      .delete(`/api/v1/articles/${testdata.wrongSlug}`)
      .set('Authorization', user2Token)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.errors).to.equal.an('object');
        done();
      });
  });
});
