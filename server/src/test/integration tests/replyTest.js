import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../index';
import user from './commentTest';
import userOneDetails from './userTest';

const { expect } = chai;
chai.use(chaiHttp);

const replyId = {};
const {
  data,
  dataII,
  commentId,
  article
} = user;

const commentIdII = {};
const commentIdIII = {};

describe('Test CRUD comments being threaded', () => {
  describe('Create comment', () => {
    it('Should return 201(Created) on creating comments on an article', (done) => {
      const commentBody = {
        userId: data.userId,
        articleId: article.id,
        comment: 'Croissant fruitcake jelly muffin chocolate cake lollipop pudding gummi bears.'
      };
      chai.request(app)
        .post(`/api/v1/articles/${article.id}/comments`)
        .set('x-token', data.token)
        .send(commentBody)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(201);
          expect(response.body.message).to.equal('Comment has been posted successfully');
          commentIdII.id = response.body.data.id;
          done();
        });
    });
    it('Should return 201(Created) on creating comments on an article', (done) => {
      const commentBody = {
        userId: data.userId,
        articleId: article.id,
        comment: 'Chocolate marzipan jelly beans halvah topping halvah.'
      };
      chai.request(app)
        .post(`/api/v1/articles/${article.id}/comments`)
        .set('x-token', data.token)
        .send(commentBody)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(201);
          expect(response.body.message).to.equal('Comment has been posted successfully');
          commentIdIII.id = response.body.data.id;
          done();
        });
    });
  });
  describe('Create a reply to a comment', () => {
    it('Should return 201(Created) on successful creating on a reply to a comment', (done) => {
      const values = {
        userId: data.userId,
        reply: 'Fruitcake carrot cake jelly-o cookie jelly-o croissant wafer icing toffee.'
      };
      chai.request(app)
        .post(`/api/v1/comments/${commentIdII.id}/replies`)
        .set('x-token', data.token)
        .send(values)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(201);
          expect(response.body.message).to.equal('Reply has been posted successfully');
          replyId.id = response.body.data.id;
          done();
        });
    });
    it('Should return 400(Bad Request) if commet uuid is invalid', (done) => {
      const values = {
        userId: data.userId,
        reply: 'Fruitcake carrot cake jelly-o cookie jelly-o croissant wafer icing toffee.'
      };
      chai.request(app)
        .post('/api/v1/comments/678ujio-oi/replies')
        .set('x-token', data.token)
        .send(values)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Invalid comment parameter');
          done();
        });
    });
    it('Should return 400(Bad Request) if reply field is empty', (done) => {
      const values = {
        userId: data.userId,
        reply: ''
      };
      chai.request(app)
        .put(`/api/v1/comments/${commentIdII.id}/replies/${replyId.id}`)
        .set('x-token', data.token)
        .send(values)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Please say something...');
          done();
        });
    });
    it('Should return 404(Not Found) if user does not exist', (done) => {
      const values = {
        userId: '70e4afbf-047a-4204-acdd-38bcb22b783b',
        reply: 'Fruitcake carrot cake jelly-o cookie jelly-o croissant wafer icing toffee.'
      };
      chai.request(app)
        .post(`/api/v1/comments/${commentIdII.id}/replies `)
        .set('x-token', userOneDetails.token)
        .send(values)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('User does not exist');
          done();
        });
    });
    it('Should return 404(Not Found) if comment does not exist', (done) => {
      const values = {
        userId: data.userId,
        reply: 'Fruitcake carrot cake jelly-o cookie jelly-o croissant wafer icing toffee.'
      };
      chai.request(app)
        .post(`/api/v1/comments/${commentId.id}/replies `)
        .set('x-token', data.token)
        .send(values)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('Comment does not exist');
          done();
        });
    });
  });
  describe('Read all replies to a comment', () => {
    it('Should return 200(OK) on getting a replies successfuly', (done) => {
      chai.request(app)
        .get(`/api/v1/comments/${commentIdII.id}/replies`)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('Replies retrieved successfully');
          done();
        });
    });
    it('Should return 400(Bad Request) if commet uuid is invalid', (done) => {
      chai.request(app)
        .get('/api/v1/comments/678ujio-oi/replies')
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Invalid comment parameter');
          done();
        });
    });
    it('Should return 404(Not Found) if comment does not exist', (done) => {
      chai.request(app)
        .get(`/api/v1/comments/${commentId.id}/replies`)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('Comment does not exist');
          done();
        });
    });
    it('Should return 200(OK) on getting comment with no reply', (done) => {
      chai.request(app)
        .get(`/api/v1/comments/${commentIdIII.id}/replies`)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('There are no replies...');
          done();
        });
    });
  });
  describe('Update reply to given to a comment by the author of the reply', () => {
    it('Should return 205(Reset Content) on editing a reply', (done) => {
      const values = {
        userId: data.userId,
        reply: 'Jelly beans fruitcake chocolate brownie. Fruitcake tart donut.'
      };
      chai.request(app)
        .put(`/api/v1/comments/${commentIdII.id}/replies/${replyId.id}`)
        .set('x-token', data.token)
        .send(values)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(205);
          expect(response.body.message).to.equal('Edited');
          done();
        });
    });
    it('Should return 400(Bad Request) if comment uuid is invalid', (done) => {
      const values = {
        userId: data.userId,
        reply: 'Jelly beans fruitcake chocolate brownie. Fruitcake tart donut.'
      };
      chai.request(app)
        .put(`/api/v1/comments/7uuijh-37ujk/replies/${replyId.id}`)
        .set('x-token', data.token)
        .send(values)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Invalid comment parameter');
          done();
        });
    });
    it('Should return 400(Bad Request) if request uuid is invalid', (done) => {
      const values = {
        userId: data.userId,
        reply: 'Jelly beans fruitcake chocolate brownie. Fruitcake tart donut.'
      };
      chai.request(app)
        .put(`/api/v1/comments/${commentIdII.id}/replies/7uuijh-37ujk`)
        .set('x-token', data.token)
        .send(values)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Invalid reply parameter');
          done();
        });
    });
    it('Should return 404(Not Found) if user does not exist', (done) => {
      const values = {
        userId: '70e4afbf-047a-4204-acdd-38bcb22b783b',
        reply: 'Jelly beans fruitcake chocolate brownie. Fruitcake tart donut.'
      };
      chai.request(app)
        .put(`/api/v1/comments/${commentIdII.id}/replies/${replyId.id}`)
        .set('x-token', userOneDetails.token)
        .send(values)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('User does not exist');
          done();
        });
    });
    it('Should return 404(Not Found) if comment does not exist', (done) => {
      const values = {
        userId: data.userId,
        reply: 'Jelly beans fruitcake chocolate brownie. Fruitcake tart donut.'
      };
      chai.request(app)
        .put(`/api/v1/comments/70e4afbf-047a-4204-acdd-38bcb22b783b/replies/${replyId.id}`)
        .set('x-token', data.token)
        .send(values)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('Comment does not exist');
          done();
        });
    });
    it('Should return 404(Not Found) if reply does not exist', (done) => {
      const values = {
        userId: data.userId,
        reply: 'Jelly beans fruitcake chocolate brownie. Fruitcake tart donut.'
      };
      chai.request(app)
        .put(`/api/v1/comments/${commentIdII.id}/replies/70e4afbf-047a-4204-acdd-38bcb22b783b`)
        .set('x-token', data.token)
        .send(values)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('Reply does not exist');
          done();
        });
    });
    it('Should return 404(Not Found) if reply does not exist', (done) => {
      const values = {
        userId: data.userId,
        reply: 'Jelly beans fruitcake chocolate brownie. Fruitcake tart donut.'
      };
      chai.request(app)
        .put(`/api/v1/comments/${commentIdII.id}/replies/${replyId.id}`)
        .set('x-token', dataII.token)
        .send(values)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(401);
          expect(response.body.message).to.equal('You are not authorized to do this');
          done();
        });
    });
    it('Should return 400(Bad Request) if uuid parameters are invalid', (done) => {
      const values = {
        userId: data.userId,
        reply: 'Jelly beans fruitcake chocolate brownie. Fruitcake tart donut.'
      };
      chai.request(app)
        .put(`/api/v1/comments/${commentIdII.id}/replies/78hdgthw-iu`)
        .set('x-token', data.token)
        .send(values)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Invalid reply parameter');
          done();
        });
    });
    it('Should return 400(Bad Request) if reply field is empty', (done) => {
      const values = {
        userId: data.userId,
        reply: ''
      };
      chai.request(app)
        .put(`/api/v1/comments/${commentIdII.id}/replies/${replyId.id}`)
        .set('x-token', data.token)
        .send(values)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Please say something...');
          done();
        });
    });
  });
  describe('Delete reply on a comment by the author of the reply', () => {
    it('Should return 404(Not Found) comments does not exist', (done) => {
      chai.request(app)
        .delete(`/api/v1/comments/70e4afbf-047a-4204-acdd-38bcb22b783b/replies/${replyId.id}`)
        .set('x-token', data.token)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('Comment does not exist');
          done();
        });
    });
    it('Should return 404(Not Found) reply does not exist', (done) => {
      chai.request(app)
        .delete(`/api/v1/comments/${commentIdII.id}/replies/70e4afbf-047a-4204-acdd-38bcb22b783b`)
        .set('x-token', data.token)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('Reply does not exist');
          done();
        });
    });
    it('Should return 404(Not Found) user does not exist', (done) => {
      chai.request(app)
        .delete(`/api/v1/comments/${commentIdII.id}/replies/${replyId.id}`)
        .set('x-token', userOneDetails.token)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('User does not exist');
          done();
        });
    });
    it('Should return 4001(Unauthorized) if another user tries to delete the reply', (done) => {
      chai.request(app)
        .delete(`/api/v1/comments/${commentIdII.id}/replies/${replyId.id}`)
        .set('x-token', dataII.token)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(401);
          expect(response.body.message).to.equal('You are not authorized to do this');
          done();
        });
    });
    it('Should return 204(No Content) on successfully deleting a reply', (done) => {
      chai.request(app)
        .delete(`/api/v1/comments/${commentIdII.id}/replies/${replyId.id}`)
        .set('x-token', data.token)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(204);
          done();
        });
    });
  });
});
