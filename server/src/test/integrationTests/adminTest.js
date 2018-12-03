import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../index';

const { expect } = chai;
chai.use(chaiHttp);

const api = '/api/v1/articles';
const superAdmin = {
  email: 'noldor_superadmin@test.com',
  password: 'password123'
};
const article = {
  title: 'Noldor is travelling',
  description: 'Helpful tips and tricks from an experienced adventurer.',
  content: 'this is the content',
  featuredImg: 'blue.jpg',
  tags: 'travel,life',
  category: 'life'
};
const badArticleSlug = 'life-isnt-always-fair-d72ea7634400';

describe('Admin Functionality Tests', () => {
  let userToken = '',
    superAdminToken = '',
    articleSlug = '';

  before((done) => { // get superadmin token
    chai.request(app)
      .post('/api/v1/users/login')
      .send(superAdmin)
      .end((error, response) => {
        if (error) done(error);
        superAdminToken = response.body.token;
        done();
      });
  });

  before((done) => { // create new dummy user
    chai.request(app)
      .post('/api/v1/users/register')
      .send({
        email: 'mama@smurf.com',
        username: 'mamasmurf',
        password: 'BigBlue5ky',
        confirmPassword: 'BigBlue5ky',
      })
      .end((error, response) => {
        if (error) done(error);
        userToken = response.body.user.token;
        done();
      });
  });

  before((done) => { // create new article
    chai.request(app)
      .post(api)
      .set('x-token', userToken)
      .send(article)
      .end((error, response) => {
        if (error) done(error);
        articleSlug = response.body.article.slug;
        done();
      });
  });

  describe('Taking Down User Articles', () => {
    it('should return a 404 if article is not found', (done) => {
      chai.request(app)
        .delete(`/api/v1/admin/takedown/articles/${badArticleSlug}`)
        .set('x-token', superAdminToken)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('article not found');
          done();
        });
    });

    it('should take down an article successfully', (done) => {
      chai.request(app)
        .delete(`/api/v1/admin/takedown/articles/${articleSlug}`)
        .set('x-token', superAdminToken)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('article taken down successfully');
          done();
        });
    });
  });

  describe('Adding A New Category', () => {
    it('should fail if category field is omitted', (done) => {
      chai.request(app)
        .post('/api/v1/categories')
        .set('x-token', superAdminToken)
        .send({ category: '' })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('category field is required');
          done();
        });
    });

    it('should fail if category field is empty', (done) => {
      chai.request(app)
        .post('/api/v1/categories')
        .set('x-token', superAdminToken)
        .send({ category: '  ' })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('category should be longer than 3 characters');
          done();
        });
    });

    it('should fail if category already exists', (done) => {
      chai.request(app)
        .post('/api/v1/categories')
        .set('x-token', superAdminToken)
        .send({ category: 'life' })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(409);
          expect(response.body.message).to.equal('category already exists');
          done();
        });
    });

    it('should add a new category successfully', (done) => {
      chai.request(app)
        .post('/api/v1/categories')
        .set('x-token', superAdminToken)
        .send({ category: 'new' })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(201);
          expect(response.body.message).to.equal('category created successfully');
          done();
        });
    });
  });

  describe('Deactivation And Reactivation of Accounts', () => {
    it('should return a 404 if user does not exist (deactivation)', (done) => {
      chai.request(app)
        .delete('/api/v1/admin/deactivate/users/babysmurf')
        .set('x-token', superAdminToken)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('user not found');
          done();
        });
    });

    it('should deactivate a user successfully', (done) => {
      chai.request(app)
        .delete('/api/v1/admin/deactivate/users/mamasmurf')
        .set('x-token', superAdminToken)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(204);
          done();
        });
    });
    it('should disallow user login', (done) => {
      const values = {
        email: 'mama@smurf.com',
        password: 'BigBlue5ky'
      };
      chai.request(app)
        .post('/api/v1/users/login')
        .send(values)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          // eslint-disable-next-line max-len
          expect(res.body.message).to.equal('Your account has been deactivated by the admin, please contact them for more details.');
          done();
        });
    });
    it('should return a 404 if user does not exist (reactivation)', (done) => {
      chai.request(app)
        .put('/api/v1/admin/reactivate/users/babysmurf')
        .set('x-token', superAdminToken)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('user not found');
          done();
        });
    });

    it('should reactivate a user successfully', (done) => {
      chai.request(app)
        .put('/api/v1/admin/reactivate/users/mamasmurf')
        .set('x-token', superAdminToken)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('user reactivated successfully');
          done();
        });
    });
  });
});
