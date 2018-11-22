import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../index';
import userOneDetails from './userTest';

const { expect } = chai;
chai.use(chaiHttp);

const article = {};
const commentId = {};
const data = {};
const dataII = {};

describe('Test CRUD Comments for articles', () => {
  describe('Signup users for commenting on articles', () => {
    it('Login first user for testing comments on article', (done) => {
      const values = {
        email: 'jane.doe@mail.com',
        password: 'password123',
      };
      chai.request(app)
        .post('/api/v1/users/login')
        .send(values)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.token).to.be.a('string');
          expect(res.header['x-token']).to.be.a('string');
          expect(res.body.message).to.equal('successfully logged in');
          dataII.token = res.body.token;
          done();
        });
    });
    it('Login second user for testing comments on article', (done) => {
      const values = {
        email: 'fred@noldor.com',
        password: 'password123',
      };
      chai.request(app)
        .post('/api/v1/users/login')
        .send(values)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.token).to.be.a('string');
          expect(res.header['x-token']).to.be.a('string');
          expect(res.body.message).to.equal('successfully logged in');
          data.token = res.body.token;
          done();
        });
    });
    it('Fred posted and article successfully', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .set('x-token', data.token)
        .send({
          title: 'Powder cotton candy',
          description: 'Pastry fruitcake gingerbread',
          content: 'Croissant fruitcake jelly muffin chocolate cake lollipop pudding gummi bears',
          featuredImg: 'ahghgkjag.jpg',
          tags: 'bars,foos,philosophical,smart',
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
    it('Uwa posted an article successfully', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .set('x-token', dataII.token)
        .send({
          title: 'Pastry fruitcake gingerbread',
          description: 'Powder cotton candy',
          content: 'Candy canes macaroon chocolate cake donut. Chupa chups candy dragée.',
          featuredImg: 'ahghgkjag.jpg',
          tags: 'bars,foos,philosophical,smart',
          category: 'life'
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          data.slug = response.body.article.slug;
          data.userId = response.body.article.userId;
          article.id = response.body.article.id;
          done();
        });
    });
    it('Should publish article', (done) => {
      chai.request(app)
        .put(`/api/v1/articles/${data.slug}/publish`)
        .set('x-token', dataII.token)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Comment on articles', () => {
    describe('Creating comments', () => {
      it('Should return 201(Created) on creating comments on an article', (done) => {
        const commentBody = {
          userId: data.userId,
          articleId: article.id,
          comment: 'Jelly beans fruitcake chocolate brownie. Fruitcake tart donut'
        };
        chai.request(app)
          .post(`/api/v1/articles/${article.id}/comments`)
          .set('x-token', data.token)
          .send(commentBody)
          .end((error, response) => {
            if (error) done(error);
            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal('Comment has been posted successfully');
            commentId.id = response.body.data.id;
            done();
          });
      });
      it('Should return 400(Bad Request) if article params is not uuid', (done) => {
        const commentBody = {
          userId: data.userId,
          articleId: article.id,
          comment: 'Jelly beans fruitcake chocolate brownie. Fruitcake tart donut'
        };
        chai.request(app)
          .post('/api/v1/articles/27678028383-uujh/comments')
          .set('x-token', data.token)
          .send(commentBody)
          .end((error, response) => {
            if (error) done(error);
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Invalid article parameter');
            done();
          });
      });
      it('Should return 404(Not Found) if user posting does not exist', (done) => {
        const commentBody = {
          userId: '70e4afbf-047a-4204-acdd-38bcb22b783b',
          articleId: article.id,
          comment: 'Jelly beans fruitcake chocolate brownie. Fruitcake tart donut'
        };
        chai.request(app)
          .post(`/api/v1/articles/${article.id}/comments`)
          .set('x-token', userOneDetails.token)
          .send(commentBody)
          .end((error, response) => {
            if (error) done(error);
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('User does not exist');
            done();
          });
      });
      it('Should return 404(Not Found) if article being commented on does not exist', (done) => {
        const commentBody = {
          userId: data.userId,
          articleId: '70e4afbf-047a-4204-acdd-38bcb22b783b',
          comment: 'Jelly beans fruitcake chocolate brownie. Fruitcake tart donut'
        };
        chai.request(app)
          .post('/api/v1/articles/70e4afbf-047a-4204-acdd-38bcb22b783b/comments')
          .set('x-token', data.token)
          .send(commentBody)
          .end((error, response) => {
            if (error) done(error);
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Article does not exist');
            done();
          });
      });
    });
    describe('Getting comments of an article', () => {
      it('Should return 200(OK) on getting a comment successfuly', (done) => {
        chai.request(app)
          .get(`/api/v1/articles/${article.id}/comments`)
          .end((error, response) => {
            if (error) done(error);
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Comments retrieved successfully');
            done();
          });
      });
      it('Should return 404(Not Found) if article does not exist', (done) => {
        chai.request(app)
          .get('/api/v1/articles/07d69bfd-155c-4824-8a1f-76de31f5aec4/comments')
          .end((error, response) => {
            if (error) done(error);
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Article does not exist');
            done();
          });
      });
    });
    describe('Updating comments written by you', () => {
      it('Should return 205(Reset Content) on editing comments on an article', (done) => {
        const commentBody = {
          userId: data.userId,
          articleId: article.id,
          comment: 'Fruitcake tart donut, Jelly beans fruitcake chocolate brownie.'
        };
        chai.request(app)
          .put(`/api/v1/articles/${article.id}/comments/${commentId.id}`)
          .set('x-token', data.token)
          .send(commentBody)
          .end((error, response) => {
            if (error) done(error);
            expect(response.status).to.equal(205);
            expect(response.body.message).to.equal('Edited');
            done();
          });
      });
      it('Should return 404(Not Found) if editing user does not exist', (done) => {
        const commentBody = {
          userId: '70e4afbf-047a-4204-acdd-38bcb22b783b',
          articleId: article.id,
          comment: 'Fruitcake tart donut, Jelly beans fruitcake chocolate brownie.'
        };
        chai.request(app)
          .put(`/api/v1/articles/${article.id}/comments/${commentId.id}`)
          .set('x-token', userOneDetails.token)
          .send(commentBody)
          .end((error, response) => {
            if (error) done(error);
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('User does not exist');
            done();
          });
      });
      it('Should return 404(Not Found) if article does not exist', (done) => {
        const commentBody = {
          userId: data.userId,
          articleId: '70e4afbf-047a-4204-acdd-38bcb22b783b',
          comment: 'Fruitcake tart donut, Jelly beans fruitcake chocolate brownie.'
        };
        chai.request(app)
          .put(`/api/v1/articles/70e4afbf-047a-4204-acdd-38bcb22b783b/comments/${commentId.id}`)
          .set('x-token', data.token)
          .send(commentBody)
          .end((error, response) => {
            if (error) done(error);
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Article does not exist');
            done();
          });
      });
      it('Should return 400(Bad Request) if commentId is not uuid', (done) => {
        const commentBody = {
          userId: data.userId,
          articleId: article.id,
          comment: 'Fruitcake tart donut, Jelly beans fruitcake chocolate brownie.'
        };
        chai.request(app)
          .put(`/api/v1/articles/${article.id}/comments/acdd-38bcb22b783b`)
          .set('x-token', data.token)
          .send(commentBody)
          .end((error, response) => {
            if (error) done(error);
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Invalid comment parameter');
            done();
          });
      });
      it('Should return 404(Not Found) if comment does not exist', (done) => {
        const commentBody = {
          userId: data.userId,
          articleId: article.id,
          comment: 'Fruitcake tart donut, Jelly beans fruitcake chocolate brownie.'
        };
        chai.request(app)
          .put(`/api/v1/articles/${article.id}/comments/70e4afbf-047a-4204-acdd-38bcb22b783b`)
          .set('x-token', data.token)
          .send(commentBody)
          .end((error, response) => {
            if (error) done(error);
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Comment does not exist');
            done();
          });
      });
    });
    describe('Delete comments written by you', () => {
      it('Should return 404(Not Found) if article does not exist', (done) => {
        chai.request(app)
          .delete(`/api/v1/articles/70e4afbf-047a-4204-acdd-38bcb22b783b/comments/${commentId.id}`)
          .set('x-token', data.token)
          .end((error, response) => {
            if (error) done(error);
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Article does not exist');
            done();
          });
      });
      it('Should return 404(Not Found) if user does not exist', (done) => {
        chai.request(app)
          .delete(`/api/v1/articles/${article.id}/comments/${commentId.id}`)
          .set('x-token', userOneDetails.token)
          .end((error, response) => {
            if (error) done(error);
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('User does not exist');
            done();
          });
      });
      it('Should return 404(Not Found) if comment does not exist', (done) => {
        chai.request(app)
          .delete(`/api/v1/articles/${article.id}/comments/70e4afbf-047a-4204-acdd-38bcb22b783b`)
          .set('x-token', data.token)
          .end((error, response) => {
            if (error) done(error);
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Comment does not exist');
            done();
          });
      });
      it('Should return 401(Unauthorized) if delete is unauthorized', (done) => {
        chai.request(app)
          .delete(`/api/v1/articles/${article.id}/comments/${commentId.id}`)
          .set('x-token', data.token)
          .end((error, response) => {
            if (error) done(error);
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('You are not authorized to do this');
            done();
          });
      });
      it('Should return a 204(No Content) when article is successfully deleted', (done) => {
        chai.request(app)
          .delete(`/api/v1/articles/${article.id}/comments/${commentId.id}`)
          .set('x-token', dataII.token)
          .end((error, response) => {
            if (error) done(error);
            expect(response.status).to.equal(204);
            done();
          });
      });
    });
  });
});

export default {
  data,
  dataII,
  commentId,
  article
};
