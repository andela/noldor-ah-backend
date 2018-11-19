import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../../../index';

const { expect } = chai;
chai.use(chaiHttp);

const data = {};


describe('POST endpoint for reports', () => {
  describe('register user', () => {
    it('Login a user, when all the required parameters is in good standing', (done) => {
      const values = {
        username: 'reporter',
        email: 'reporter@noldor.com',
        password: 'password123',
        confirmPassword: 'password123'
      };
      chai.request(app)
        .post('/api/v1/users/register')
        .send(values)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          data.token = res.body.user.token;
          done();
        });
    });
    it('Register a 2nd user, when all the required parameters is in good standing', (done) => {
      const values = {
        username: 'resolver',
        email: 'resolver@noldor.com',
        password: 'password123',
        confirmPassword: 'password123'
      };
      chai.request(app)
        .post('/api/v1/users/register')
        .send(values)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(200);
          data.token2 = res.body.user.token;
          done();
        });
    });
  });
  describe('post a test article', () => {
    it('should return 201 if report is added successfully', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .set('X-Token', data.token)
        .send(
          {
            title: 'this is the title',
            description: 'this is the description',
            content: 'this is the content',
            featuredImg: 'ahghgkjag.jpg'

          }
        )
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          data.slug = response.body.article.slug;
          done();
        });
    });
    it('should return 200 if report is published successfully', (done) => {
      chai.request(app)
        .put(`/api/v1/articles/${data.slug}/publish`)
        .set('X-Token', data.token)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });

  describe('get all reports before a report is made', () => {
    it('should return a 404 if no report is sent', (done) => {
      chai.request(app)
        .get('/api/v1/reports')
        .set('X-Token', data.token2)
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('no report found');
          done();
        });
    });
  });

  describe('post an report', () => {
    it('should not add an report without type and detail', (done) => {
      chai.request(app)
        .post(`/api/v1/articles/${data.slug}/report`)
        .set('X-Token', data.token)
        .send({})
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          done();
        });
    });
    it('should not add an report with empty body ', (done) => {
      chai.request(app)
        .post(`/api/v1/articles/${data.slug}/report`)
        .set('X-Token', data.token)
        .send({ reportType: '', reportDetail: '' })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          done();
        });
    });
    it('should return 404 if article is not found', (done) => {
      chai.request(app)
        .post('/api/v1/articles/28ea733b-69c9-4b7e-9dca-e19e22f40c57/report')
        .set('X-Token', data.token)
        .send({
          reportType: 'plagiarism',
          reportDetail: 'copied from Hope Uwa without referencing',
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body).to.be.an('object');
          done();
        });
    });
    it('should return 201 if report is add sucessfully', (done) => {
      chai.request(app)
        .post(`/api/v1/articles/${data.slug}/report`)
        .set('X-Token', data.token)
        .send({
          reportType: 'plagiarism',
          reportDetail: 'copied from Hope Uwa without referencing',
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          done();
        });
    });
    it('should return 200 if article has been reported before', (done) => {
      chai.request(app)
        .post(`/api/v1/articles/${data.slug}/report`)
        .set('X-Token', data.token)
        .send({
          reportType: 'plagiarism',
          reportDetail: 'copied from Hope Uwa without referencing',
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('you have reported this article previously');
          done();
        });
    });
  });
});
describe('GET endpoint for reports', () => {
  it('should return 200 if report is fetched successfully', (done) => {
    chai.request(app)
      .get('/api/v1/reports')
      .set('X-Token', data.token2)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        data.reportId = response.body.data[0].reportId;
        done();
      });
  });
});
describe('PUT endpoint for reports', () => {
  it('should not resolve a report without comment', (done) => {
    chai.request(app)
      .put(`/api/v1/reports/${data.reportId}/resolve`)
      .set('X-Token', data.token2)
      .send({})
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should not resolve a report with empty comment body', (done) => {
    chai.request(app)
      .put(`/api/v1/reports/${data.reportId}/resolve`)
      .set('X-Token', data.token2)
      .send({})
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should not resolve a report with comment body less then 10 characters', (done) => {
    chai.request(app)
      .put(`/api/v1/reports/${data.reportId}/resolve`)
      .set('X-Token', data.token2)
      .send({ comment: 'this' })
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should return 404 reports is not found', (done) => {
    chai.request(app)
      .put('/api/v1/reports/28ea733b-69c9-4b7e-9dca-e19e22f40c57/resolve')
      .set('X-Token', data.token2)
      .send({ comment: 'this is a comment about how he stole the article' })
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should 200 when comment is resolved', (done) => {
    chai.request(app)
      .put(`/api/v1/reports/${data.reportId}/resolve`)
      .set('X-Token', data.token2)
      .send({ comment: 'this is a comment about how he stole the article' })
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});
