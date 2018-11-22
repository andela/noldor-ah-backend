import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../index';
import user from './commentTest';
import comment from './replyTest';
import userOneDetails from './userTest';

const { expect } = chai;
chai.use(chaiHttp);

// eslint-disable-next-line max-len
const oldToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNmIzZGMyNzktYzhlNi00ODY5LTkwMjItNTE3NGQ3MzNmNGU2IiwiZW1haWwiOiJ0ZXN0MEBtb2NoYS5jb20iLCJ1c2VybmFtZSI6InVzZXJvbmUwIn0sImlhdCI6MTU0MjU1MjM0MywiZXhwIjoxNTQzMTU3MTQzfQ.tCi-n6d1I3SMdZwd0GSdllp1r4VYjC_xjosUp8NUKJ0';
const {
  data,
  commentId
} = user;

const {
  commentIdIII,
  replyIdII
} = comment;

describe('Like Comments and their reply', () => {
  describe('like comment and unlike a comment', () => {
    it('Should return 201(created) when successfully liked', (done) => {
      const value = {
        userId: data.userId,
        commentId: commentIdIII.id
      };
      chai.request(app)
        .post(`/api/v1/comments/${commentIdIII.id}/likes`)
        .set('x-token', data.token)
        .send(value)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(201);
          expect(response.body.message).to.equal('You like this comment');
          done();
        });
    });
    it('Should return 404(Not Found) when user does not exist', (done) => {
      const value = {
        userId: data.userId,
        commentId: commentIdIII.id
      };
      chai.request(app)
        .post(`/api/v1/comments/${commentIdIII.id}/likes`)
        .set('x-token', userOneDetails.token)
        .send(value)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('User does not exist');
          done();
        });
    });
    it('Should return 404(Not Found) when comment does not exist', (done) => {
      const value = {
        userId: data.userId,
        commentId: commentId.id
      };
      chai.request(app)
        .post(`/api/v1/comments/${commentId.id}/likes`)
        .set('x-token', data.token)
        .send(value)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('Comment does not exist');
          done();
        });
    });
    it('Should return 200(Ok) when successfully unliked', (done) => {
      const value = {
        userId: data.userId,
        commentId: commentIdIII.id
      };
      chai.request(app)
        .post(`/api/v1/comments/${commentIdIII.id}/likes`)
        .set('x-token', data.token)
        .send(value)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('You have unliked this comment');
          done();
        });
    });
    it('Should return 400(Bad Request) if comment uuid is invalid', (done) => {
      const value = {
        userId: data.userId,
        commentId: commentIdIII.id
      };
      chai.request(app)
        .post('/api/v1/comments/78uhdgd-jhyt/likes')
        .set('x-token', data.token)
        .send(value)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Invalid comment parameter');
          done();
        });
    });
  });
  describe('Like and unlike a Reply', () => {
    it('Should return 201(Created) when successfully liked', (done) => {
      const value = {
        userId: data.userId,
        replyId: replyIdII.id
      };
      chai.request(app)
        .post(`/api/v1/replies/${replyIdII.id}/likes`)
        .set('x-token', data.token)
        .send(value)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(201);
          expect(response.body.message).to.equal('You like this reply');
          done();
        });
    });
    it('Should return 400(Bad Request) if reply uuid is invalid', (done) => {
      const value = {
        userId: data.userId,
        commentId: commentIdIII.id
      };
      chai.request(app)
        .post('/api/v1/replies/78uhdgd-jhyt/likes')
        .set('x-token', data.token)
        .send(value)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Invalid reply parameter');
          done();
        });
    });
    it('Should return 200(Ok) when successfully unliked', (done) => {
      const value = {
        userId: data.userId,
        replyId: replyIdII.id
      };
      chai.request(app)
        .post(`/api/v1/replies/${replyIdII.id}/likes`)
        .set('x-token', data.token)
        .send(value)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('You have unliked this reply');
          done();
        });
    });
    it('Should return 404(Not Found) if user does not exist', (done) => {
      const value = {
        userId: data.userId,
        replyId: replyIdII.id
      };
      chai.request(app)
        .post(`/api/v1/replies/${replyIdII.id}/likes`)
        .set('x-token', userOneDetails.token)
        .send(value)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('User does not exist');
          done();
        });
    });
    it('Should return 404(Not Found) if reply does not exist', (done) => {
      const value = {
        userId: data.userId,
        replyId: replyIdII.id
      };
      chai.request(app)
        .post('/api/v1/replies/70e4afbf-047a-4204-acdd-38bcb22b783b/likes')
        .set('x-token', data.token)
        .send(value)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('Reply does not exist');
          done();
        });
    });
    it('Should return 401(unauthorized) if no token is provided', (done) => {
      const value = {
        userId: data.userId,
        replyId: replyIdII.id
      };
      chai.request(app)
        .post(`/api/v1/replies/${replyIdII.id}/likes`)
        .send(value)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(401);
          expect(response.body.message).to.equal('Access denied. No token provided.');
          done();
        });
    });
    it('Should return 401(unauthorized) if token is invalid', (done) => {
      const value = {
        userId: data.userId,
        replyId: replyIdII.id
      };
      chai.request(app)
        .post(`/api/v1/replies/${replyIdII.id}/likes`)
        .set('x-token', oldToken)
        .send(value)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(401);
          expect(response.body.message).to.equal('invalid token');
          done();
        });
    });
  });
});
