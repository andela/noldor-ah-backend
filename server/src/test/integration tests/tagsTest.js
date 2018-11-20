/* eslint-disable max-len */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../index';

const { expect } = chai;
chai.use(chaiHttp);

let articleSlug = '';

describe('Tags Test Initializations', () => {
  let userToken = '';

  before((done) => {
    chai.request(app)
      .post('/api/v1/users/register')
      .send({
        email: 'tags@mocha.com',
        username: 'usertest',
        password: 'Mochapassword1',
        confirmPassword: 'Mochapassword1',
      })
      .end((error, response) => {
        if (error) done(error);
        userToken = response.body.user.token;
        done();
      });
  });

  describe('Tags Test', () => {
    it('should post an article without tags successfully', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .set({ 'x-token': userToken })
        .send({
          title: 'Article Without Tag',
          description: 'This article has no tags.',
          content: 'There is really no foo without bar.',
          featuredImg: 'image.com',
          category: 'life'
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          articleSlug = response.body.article.slug;
          done();
        });
    });

    it('should post an article with tags successfully', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .set({ 'x-token': userToken })
        .send({
          title: 'Article With Tag',
          description: 'This article has 5 tags.',
          content: 'Bars and foos are all we are.',
          featuredImg: 'image.com',
          tags: 'bars,foos,philosophical,smart,brainiac',
          category: 'life',
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('should update an article tags successfully', (done) => {
      chai.request(app)
        .put(`/api/v1/articles/${articleSlug}`)
        .set({ 'x-token': userToken })
        .send({
          tags: 'bars,foos,philosophical,smart,brainiac',
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('article has been updated successfully');
          done();
        });
    });

    it('should fail to update an article tags if the article is nonexistent', (done) => {
      chai.request(app)
        .put(`/api/v1/articles/${articleSlug}s`)
        .set({ 'x-token': userToken })
        .send({
          tags: 'bars,foos,philosophical,smart,brainiac',
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('article not found');
          done();
        });
    });

    it('should fail when a tag of less than 3 characters is added', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .set({ 'x-token': userToken })
        .send({
          title: 'Article With Tag',
          description: 'This article has 5 tags.',
          content: 'Bars and foos are all we are.',
          featuredImg: 'image.com',
          tags: 'ba',
          category: 'life'
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0]).to.equal('at least one tag of more than 3 letters is required');
          done();
        });
    });

    it('should fail when more than 5 tags are added', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .set({ 'x-token': userToken })
        .send({
          title: 'Article With Tag',
          description: 'This article has 5 tags.',
          content: 'Bars and foos are all we are.',
          featuredImg: 'image.com',
          tags: 'bars,foos,philosophical,smart,brainiac,error',
          category: 'life'
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0]).to.equal('you can only add up to 5 tags');
          done();
        });
    });

    it('should fail when a tag consisting of only numbers is added', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .set({ 'x-token': userToken })
        .send({
          title: 'Article With Tag',
          description: 'This article has 5 tags.',
          content: 'Bars and foos are all we are.',
          featuredImg: 'image.com',
          tags: 'bars,foos,philosophical,111,brainiac',
          category: 'life'
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0]).to.equal('a tag cannot consist of numbers alone');
          done();
        });
    });

    it('should fail when a tag with a special character is added', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .set({ 'x-token': userToken })
        .send({
          title: 'Article With Tag',
          description: 'This article has 5 tags.',
          content: 'Bars and foos are all we are.',
          featuredImg: 'image.com',
          tags: 'bars,foos,philosophical,sm@rt,brainiac',
          category: 'life'
        })
        .end((error, response) => {
          if (error) done(error);
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors[0]).to.equal('a tag must not contain any special characters');
          done();
        });
    });
  });
});
