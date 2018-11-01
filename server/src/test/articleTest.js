import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../../index';
import userToken from '../middlewares/token';

const { expect } = chai;
chai.use(chaiHttp);

const payload = {
  id: 1,
  email: 'uwahope007',
  username: 'uwahope'
};
const wrongToken = 'dhgnahdbcmajnbscjkjadslkcjbandskjncbakdjshxmncbkamhnbckanbdsnxkchamdmcd';
const fakeToken = userToken.issue(payload);

const testArticle = {
  title: 'this is the title',
  description: 'this is the description',
  content: 'this is the content'
};
const noTitleArticle = {
  title: '',
  description: 'this is the description',
  content: 'this is the content'
};
const noDescriptionArticle = {
  title: 'this is the title',
  description: '',
  content: 'this is the content'
};
const noContentArticle = {
  title: 'this is the title',
  description: 'this is a description',
  content: ''
};
const data = {};

describe('GET all articles endpoint', () => {
  it('should return a 200', (done) => {
    chai.request(app)
      .get('/api/articles')
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});
describe('POST endpoint for creating articles', () => {
  it('Register a user, when all the required parameters is in good standing', (done) => {
    const values = {
      email: 'hope@noldor.com',
      username: 'elpis',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/users/register')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.user.success).to.equal(true);
        data.token = res.body.user.token;
        done();
      });
  });
  it('Register a user, when all the required parameters is in good standing', (done) => {
    const values = {
      email: 'uwa@noldor.com',
      username: 'uwaelpis',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/users/register')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.user.success).to.equal(true);
        data.token2 = res.body.user.token;
        done();
      });
  });
  const api = '/api/articles';
  it('should require a token for authorisation ', (done) => {
    chai.request(app)
      .post(api)
      .send(testArticle)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(401);
        // expect(response.body.error).to.be.an('object');
        // expect(response.body.errors).to.equal('You are unauthorised to make this request');
        done();
      });
  });

  it('should require the correct token for authorisation ', (done) => {
    chai.request(app)
      .post(api)
      .set('X-Token', wrongToken)
      .send(testArticle)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(400);
        expect(response.body).to.be.an('object');

        done();
      });
  });

  it('should not add an article with no title', (done) => {
    chai.request(app)
      .post(api)
      .set('X-Token', data.token)
      .send(noTitleArticle)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });


  it('should not add an article with no body ', (done) => {
    chai.request(app)
      .post(api)
      .set('X-Token', data.token)
      .send(noContentArticle)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should not add an article with no description ', (done) => {
    chai.request(app)
      .post(api)
      .set('X-Token', data.token)
      .send(noDescriptionArticle)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });


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
        data.slug = response.body.article.slug;
        done();
      });
  });

  it('should return 201 if article is added successfully', (done) => {
    chai.request(app)
      .post(api)
      .set('X-Token', fakeToken)
      .send({
        title: 'this is the title',
        description: 'this is the description',
        content: 'this is the content',
        featuredImg: 'ahghgkjag.jpg'

      })
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(500);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});


describe('GET endpoint for logged-in user articles', () => {
  const api = '/api/users/articles';
  it('should require an authorization token', (done) => {
    chai.request(app)
      .get(api)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(401);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should require the correct token for authorisation ', (done) => {
    chai.request(app)
      .get(api)
      .set('X-Token', wrongToken)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(400);
        // expect(response.body.errors).to.be.an('object');
        // expect(response.body.errors.message).to.equal.to.an('object');
        done();
      });
  });
  it('should return an 200 if successfull', (done) => {
    chai.request(app)
      .get(api)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should return an 404', (done) => {
    chai.request(app)
      .get(api)
      .set('X-Token', data.token2)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});

describe('GET endpoint for logged-in user drafts', () => {
  const api = '/api/articles/drafts';
  it('should require a token for authorisation ', (done) => {
    chai.request(app)
      .get(api)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(401);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should require the correct token for authorisation ', (done) => {
    chai.request(app)
      .get(api)
      .set('X-Token', wrongToken)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(400);
        expect(response.body).to.be.an('object');

        done();
      });
  });
  it('should return an 200 if successfull', (done) => {
    chai.request(app)
      .get(api)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should return 404 if article is not found ', (done) => {
    chai.request(app)
      .get(api)
      .set('X-Token', data.token2)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        expect(response.body.error).to.be.an('object');

        done();
      });
  });
});
describe('GET endpoint for an article', () => {
  it('should return an 200 if found', (done) => {
    chai.request(app)
      .get(`/api/articles/${data.slug}`)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  // it('should return 404 if article is not found ', (done) => {
  //   const noArticleApi = '/api/articles/72567927';
  //   chai.request(app)
  //     .get(noArticleApi)
  //     .end((error, response) => {
  //       if (error) done(error);
  //       expect(response.status).to.equal(404);
  //       expect(response.body.error).to.be.an('object');

  //       done();
  //     });
  // });
});
describe('Update endpoint for articles', () => {
  const api = `/api/articles/${data.slug}`;
  it('should require a token for authorisation', (done) => {
    chai.request(app)
      .put(api)
      .send(testArticle)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(401);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should require a correct token', (done) => {
    chai.request(app)
      .put(api)
      .set('X-Token', wrongToken)
      .send(testArticle)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });


  // it('should return a 404 if article does not exist', (done) => {
  //   chai.request(app)
  //     .put(`/api/articles/${5467898}`)
  //     .set('X-Token', data.token)
  //     .send(noDescriptionArticle)
  //     .end((error, response) => {
  //       if (error) done(error);
  //       expect(response.status).to.equal(404);
  //       expect(response.body).to.be.an('object');
  //       done();
  //     });
  // });


  it('should return a 201', (done) => {
    chai.request(app)
      .put(`/api/articles/${data.slug}`)
      .set('X-Token', data.token)
      .send(testArticle)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should return a 201', (done) => {
    chai.request(app)
      .put(`/api/articles/${data.slug}`)
      .set('X-Token', data.token)
      .send({
        title: 'this is the title',
        description: 'this is the description'
      })
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should return a 201', (done) => {
    chai.request(app)
      .put(`/api/articles/${data.slug}`)
      .set('X-Token', data.token)
      .send({
        description: 'this is the description',
        content: 'this is the content'
      })
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should return a 201', (done) => {
    chai.request(app)
      .put(`/api/articles/${data.slug}`)
      .set('X-Token', data.token)
      .send({
        title: 'this is the title',
        content: 'this is the content'
      })
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        done();
      });
  });


  it('should return a 401 if user is not author', (done) => {
    chai.request(app)
      .put(`/api/articles/${data.slug}`)
      .set('X-Token', data.token2)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(401);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});

describe('Update endpoint for publishing article', () => {
  it('should require a token for authorisation', (done) => {
    chai.request(app)
      .put(`/api/articles/${data.slug}/publish`)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(401);
        // expect(response.body.errors).to.be.an('object');
        done();
      });
  });
  it('should require the correct token for authorisation', (done) => {
    chai.request(app)
      .put(`/api/articles/${data.slug}/publish`)
      .set('X-Token', wrongToken)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(400);
        // expect(response.body.errors).to.be.an('object');
        done();
      });
  });


  it('should return a 404 if article does not exist', (done) => {
    chai.request(app)
      .put('/api/articles/62a313a02a6g/publish')
      .set('X-Token', data.token)
      .send(noDescriptionArticle)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        // expect(response.body.errors).to.be.an('object');
        done();
      });
  });


  it('should return a 201', (done) => {
    chai.request(app)
      .put(`/api/articles/${data.slug}/publish`)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        done();
      });
  });


  it('should return a 401 if user is not author', (done) => {
    chai.request(app)
      .put(`/api/articles/${data.slug}/publish`)
      .set('X-Token', data.token2)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(401);
        // expect(response.body.errors).to.be('object');
        done();
      });
  });
});
describe('GET all articles endpoint', () => {
  it('should return a 200', (done) => {
    chai.request(app)
      .get('/api/articles')
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});
describe('DELETE endpoint for an article', () => {
  it('should require a token for authorisation ', (done) => {
    chai.request(app)
      .delete(`/api/articles/${data.slug}`)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(401);
        // expect(response.body.errors).to.equal.an('object');
        done();
      });
  });

  it('should require the correct token for authorisation ', (done) => {
    chai.request(app)
      .delete(`/api/articles/${data.slug}`)
      .set('X-Token', wrongToken)
      .send(testArticle)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        // expect(response.body.errors).to.equal('object');
        done();
      });
  });

  it('should returns 401 if article is for another user ', (done) => {
    chai.request(app)
      .delete(`/api/articles/${data.slug}`)
      .set('X-Token', data.token2)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        // expect(response.body.errors).to.equal('object');
        done();
      });
  });

  it('should return a status 200', (done) => {
    chai.request(app)
      .delete(`/api/articles/${data.slug}`)
      .set('X-Token', data.token)
      .end((error, response) => {
        expect(response.status).to.equal(204);
        // expect(response.body).to.equal('object');
        done();
      });
  });


  it('should return 404 if article does not exist ', (done) => {
    chai.request(app)
      .delete(`/api/articles/${data.slug}`)
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        // expect(response.body.errors).to.equal.an('object');
        done();
      });
  });
});
