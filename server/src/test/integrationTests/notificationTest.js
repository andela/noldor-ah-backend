import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../../../index';

const { expect } = chai;
chai.use(chaiHttp);

const data = {};

describe('Notifications', () => {
  it('Register a user, ', (done) => {
    const values = {
      email: 'notify1@noldor.com',
      username: 'notify1',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/api/v1/users/register')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.user.success).to.equal(true);
        data.token = res.body.user.token;
        done();
      });
  });
  it('Register a user,2 ', (done) => {
    const values = {
      email: 'notify2@noldor.com',
      username: 'notify2',
      password: 'password123',
      confirmPassword: 'password123'
    };
    chai.request(app)
      .post('/api/v1/users/register')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.user.success).to.equal(true);
        data.token2 = res.body.user.token;
        done();
      });
  });
  it('should return 200 to opt-out of notification', (done) => {
    chai.request(app)
      .put('/api/v1/users/notifications/opt')
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.be.equal('you have opted out for notifications');
        done();
      });
  });

  it('should return 403 to get all notifications', (done) => {
    chai.request(app)
      .get('/api/v1/notifications')
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(403);
        expect(response.body).to.be.an('object');
        expect(response.body.success).to.be.equal(false);
        expect(response.body.message).to.be.equal('you have opted out of getting notifications');
        done();
      });
  });
  it('should return 200 to opt-in of notification', (done) => {
    chai.request(app)
      .put('/api/v1/users/notifications/opt')
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.be.equal('you have opted in for notifications');
        done();
      });
  });

  it('should return 200 for no new notifications', (done) => {
    chai.request(app)
      .get('/api/v1/notifications')
      .set('X-Token', data.token)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.current).to.be.equal('You have no new notifications');
        done();
      });
  });

  it('should return 201 for notify2 follows notify 1', (done) => {
    chai.request(app)
      .post('/api/v1/users/notify1/follow')
      .set('X-Token', data.token2)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should return 201 if article is added successfully', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('X-Token', data.token)
      .send({
        title: 'this is the title',
        description: 'this is the description',
        content: 'this is the content',
        featuredImg: 'ahghgkjag.jpg',
        tags: 'bars,foos,philosophical,smart',
        category: 'life'

      })
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
        data.slug = response.body.article.slug;
        data.articleId = response.body.article.id;
        done();
      });
  });
  it('should return a 201', (done) => {
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

  it('should return 200 to opt-out of notification', (done) => {
    chai.request(app)
      .put('/api/v1/users/notifications/opt')
      .set('X-Token', data.token2)
      .end((error, response) => {
        if (error) done(error);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.be.equal('you have opted out for notifications');
        done();
      });
  });
});

export default data;
