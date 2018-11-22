import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../index';

const { expect } = chai;
chai.use(chaiHttp);

const user1 = {};
const user2 = {};
const superAdmin = {};
const fakeToken = 'fjbifbifbifb198jfbb4hu.ith95894g398g4.iht95ht98t';
const invalidArticleId = 'fjbifbifbifb198jfbb4hu.ith95894g398g4.iht95h';
const invalidCommentId = 'fjbifbifbifb198jfbb4hu.ith95894g398g4.iht95h';
const nonExistingArticleId = 'b430a746-728c-434a-8ac8-92bf3724a9e2';
const nonExistingCommentId = 'a2f41e85-2496-4ac4-94b4-48d2bae1a176';

describe('User reports comment', () => {
  it('Login first user for testing comments on article', (done) => {
    const values = {
      email: 'uwa@noldor.com',
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
        user1.token = res.body.token;
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
        user2.token = res.body.token;
        done();
      });
  });

  it('Login the superAdmin for resolving reported comment issues', (done) => {
    const values = {
      email: 'noldor_superadmin@test.com',
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
        superAdmin.token = res.body.token;
        done();
      });
  });

  it('user2 posted and article successfully', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-token', user2.token)
      .send({
        title: 'Here is a post from user2',
        description: 'brief description',
        content: 'some more description tp make a comment',
        featuredImg: 'jeez.jpg',
        tags: 'bars,foos,philosophical,smart',
        category: 'life'
      })
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        user2.article = response.body.article;
        done();
      });
  });
  it('user1 posted an article successfully', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-token', user1.token)
      .send({
        title: 'Post from user 1',
        description: 'small talks',
        content: 'Candy canes macaroon chocolate cake donut. Chupa chups candy dragée.',
        featuredImg: 'somelink.jpg',
        tags: 'bars,foos,philosophical,smart',
        category: 'life'
      })
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        user1.article = response.body.article;
        done();
      });
  });
  it('Should publish user1 article', (done) => {
    chai.request(app)
      .put(`/api/v1/articles/${user1.article.slug}/publish`)
      .set('x-token', user1.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('Should return 201 on creating comments on an article', (done) => {
    const commentBody = {
      userId: user1.article.userId,
      articleId: user2.article.id,
      comment: 'Some really nice comment'
    };
    chai.request(app)
      .post(`/api/v1/articles/${commentBody.articleId}/comments`)
      .set('x-token', user1.token)
      .send(commentBody)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Comment has been posted successfully');
        user1.commentId = response.body.data.id;
        done();
      });
  });
  it('should return 401 for no token ', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/report`;
    chai.request(app)
      .post(url)
      .send({
        reportType: 'plagiarism',
        reportDetail: 'Copied a work from chris dean. Here is a link'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Access denied. No token provided.');
        done();
      });
  });

  it('should return 401 for providing wrong token', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/report`;
    chai.request(app)
      .post(url)
      .set('x-token', fakeToken)
      .send({
        reportType: 'plagiarism',
        reportDetail: 'Copied a work from chris dean. Here is a link'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('invalid token');
        done();
      });
  });

  it('should return 400 for invalid article id', (done) => {
    const url = `/api/v1/articles/${invalidArticleId}/comments/${invalidCommentId}/report`;
    chai.request(app)
      .post(url)
      .set('x-token', user2.token)
      .send({
        reportType: 'plagiarism',
        reportDetail: 'Copied a work from chris dean. Here is a link'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Invalid article parameter');
        done();
      });
  });

  it('should return 400 for invalid comment id', (done) => {
    const questionId = user2.article.id;
    const url = `/api/v1/articles/${questionId}/comments/${invalidCommentId}/report`;
    chai.request(app)
      .post(url)
      .set('x-token', user2.token)
      .send({
        reportType: 'plagiarism',
        reportDetail: 'Copied a work from chris dean. Here is a link'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Invalid comment parameter');
        done();
      });
  });

  it('should return 404 for invalid Article', (done) => {
    const { commentId } = user1;
    const url = `/api/v1/articles/${nonExistingArticleId}/comments/${commentId}/report`;
    chai.request(app)
      .post(url)
      .set('x-token', user2.token)
      .send({
        reportType: 'plagiarism',
        reportDetail: 'Copied a work from chris dean. Here is a link'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Article does not exist');
        done();
      });
  });

  it('should return 200 on reporting a comment', (done) => {
    const questionId = user2.article.id;
    const url = `/api/v1/articles/${questionId}/comments/${nonExistingCommentId}/report`;
    chai.request(app)
      .post(url)
      .set('x-token', user2.token)
      .send({
        reportType: 'plagiarism',
        reportDetail: 'Copied a work from chris dean. Here is a link'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('comment does not exist');
        done();
      });
  });

  it('should return 400 on invalid params', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/report`;
    chai.request(app)
      .post(url)
      .set('x-token', user2.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.error.message.reportType).to.equal('reportType is required');
        expect(res.body.error.message.reportDetail).to.equal('reportDetail is required');
        done();
      });
  });

  it('should return 200 on reporting a comment', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/report`;
    chai.request(app)
      .post(url)
      .set('x-token', user2.token)
      .send({
        reportType: 'plagiarism',
        reportDetail: 'Copied a work from chris dean. Here is a link'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Comment has been reported');
        done();
      });
  });

  it('should return 200 on comment already reported', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/report`;
    chai.request(app)
      .post(url)
      .set('x-token', user2.token)
      .send({
        reportType: 'plagiarism',
        reportDetail: 'Copied a work from chris dean. Here is a link'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('This comment is currently under review');
        done();
      });
  });

  it('should return 401 for invalid token', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/resolve/editcomments`;
    chai.request(app)
      .put(url)
      .send({
        acceptedComment: 'Here is me adjusting my comment by making reference to Chris Dean\'s work'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Access denied. No token provided.');
        done();
      });
  });

  it('should return 400 for invalid article id', (done) => {
    const { commentId } = user1;
    const url = `/api/v1/articles/${invalidArticleId}/comments/${commentId}/resolve/editcomments`;
    chai.request(app)
      .put(url)
      .set('x-token', user1.token)
      .send({
        acceptedComment: 'Here is me adjusting my comment by making reference to Chris Dean\'s work'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Invalid article parameter');
        done();
      });
  });
  it('should return 400 for invalid comment id', (done) => {
    const questionId = user2.article.id;
    const url = `/api/v1/articles/${questionId}/comments/${invalidCommentId}/resolve/editcomments`;
    chai.request(app)
      .put(url)
      .set('x-token', user1.token)
      .send({
        acceptedComment: 'Here is me adjusting my comment by making reference to Chris Dean\'s work'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Invalid comment parameter');
        done();
      });
  });

  it('should return 200 on editing a reported comment', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/resolve/editcomments`;
    chai.request(app)
      .put(url)
      .set('x-token', user1.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('acceptedComment is required');
        done();
      });
  });

  it('should return 200 on editing a reported comment', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/resolve/editcomments`;
    chai.request(app)
      .put(url)
      .set('x-token', user1.token)
      .send({
        acceptedComment: '  '
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('acceptedComment must be a string and cannot be empty');
        done();
      });
  });

  it('should return 401 for not the user\'s comment', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/resolve/editcomments`;
    chai.request(app)
      .put(url)
      .set('x-token', user2.token)
      .send({
        acceptedComment: 'Here is me adjusting my comment by making reference to Chris Dean\'s work'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('you can only edit your comment');
        done();
      });
  });

  it('should return 404 for not found accepted comment from the user', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const string = 'this user needs to provide acceptable comment for issues to be resolved';
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/resolve`;
    chai.request(app)
      .put(url)
      .set('x-token', superAdmin.token)
      .send({
        decision: 'resolved'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(string);
        done();
      });
  });

  it('should return 200 on editing a reported comment', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/resolve/editcomments`;
    chai.request(app)
      .put(url)
      .set('x-token', user1.token)
      .send({
        acceptedComment: 'Here is me adjusting my comment by making reference to Chris Dean\'s work'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('comment added and currently on review');
        done();
      });
  });

  it('should return 401 for no token provided', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/resolve`;
    chai.request(app)
      .put(url)
      .send({
        decision: 'resolved'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Access denied. No token provided.');
        done();
      });
  });

  it('should return 401 for invalid token', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/resolve`;
    chai.request(app)
      .put(url)
      .set('x-token', fakeToken)
      .send({
        decision: 'resolved'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('invalid token');
        done();
      });
  });

  it('should return 401 for non admin users', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/resolve`;
    chai.request(app)
      .put(url)
      .set('x-token', user1.token)
      .send({
        decision: 'resolved'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('you cannot perform this operation');
        done();
      });
  });

  it('should return 400 for invaild question parameter', (done) => {
    const { commentId } = user1;
    const url = `/api/v1/articles/${invalidArticleId}/comments/${commentId}/resolve`;
    chai.request(app)
      .put(url)
      .set('x-token', superAdmin.token)
      .send({
        decision: 'resolved'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Invalid article parameter');
        done();
      });
  });

  it('should return 400 for invalid comment parameter', (done) => {
    const questionId = user2.article.id;
    const url = `/api/v1/articles/${questionId}/comments/${invalidCommentId}/resolve`;
    chai.request(app)
      .put(url)
      .set('x-token', superAdmin.token)
      .send({
        decision: 'resolved'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Invalid comment parameter');
        done();
      });
  });

  it('should return 400 on invalid decision', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/resolve`;
    chai.request(app)
      .put(url)
      .set('x-token', superAdmin.token)
      .send({
        decision: 'some decision'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('decision can only be either blocked or resolved');
        done();
      });
  });

  it('should return 200 on editing a reported comment', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/resolve`;
    chai.request(app)
      .put(url)
      .set('x-token', superAdmin.token)
      .send({
        decision: 'resolved'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Issue has been resolved');
        done();
      });
  });

  it('Should sort the list of comment reports by status', (done) => {
    const status = 'resolved';
    const url = `/api/v1/articles/comments/reports?status=${status}`;
    chai.request(app)
      .get(url)
      .set('x-token', superAdmin.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal(`All ${status} comments`);
        done();
      });
  });

  it('Should sort the list of comment reports by status', (done) => {
    const status = 'pending';
    const url = `/api/v1/articles/comments/reports?status=${status}`;
    chai.request(app)
      .get(url)
      .set('x-token', superAdmin.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(`There are no ${status} reports`);
        done();
      });
  });

  it('Should sort the list of comment reports by status', (done) => {
    const status = 'blocked';
    const url = `/api/v1/articles/comments/reports?status=${status}`;
    chai.request(app)
      .get(url)
      .set('x-token', superAdmin.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(`There are no ${status} reports`);
        done();
      });
  });

  it('should return 200 on editing a reported comment', (done) => {
    const questionId = user2.article.id;
    const { commentId } = user1;
    const url = `/api/v1/articles/${questionId}/comments/${commentId}/resolve`;
    chai.request(app)
      .put(url)
      .set('x-token', superAdmin.token)
      .send({
        decision: 'blocked'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Comment has been deleted');
        done();
      });
  });
});
