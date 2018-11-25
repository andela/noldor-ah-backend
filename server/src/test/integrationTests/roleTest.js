import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../index';

const { expect } = chai;
chai.use(chaiHttp);

const superUserDetails = {};
const nonAdminuserDetails = {};
const fakeToken = 'hghgshbdij5ib85y7t7y498y89.jinbguhgtuthhg.oihu95h98ribiufgb';

describe('Assign Super Admin', () => {
  before(() => {
    process.env.SUPER_USER_EMAIL = 'uwa@noldor.com';
    process.env.SUPER_USER_PASSWORD = 'password123';
    process.env.SUPER_USERNAME = 'uwaelpis';
  });
  after(() => {
    process.env.SUPER_USER_EMAIL = '';
    process.env.SUPER_USER_PASSWORD = '';
    process.env.SUPER_USERNAME = '';
  });

  before((done) => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'hope@noldor.com',
        password: 'password123',
      })
      .end((err, res) => {
        if (err) done(err);
        nonAdminuserDetails.token = res.body.token;
        done();
      });
  });

  it('should return 400 for required fields', (done) => {
    process.env.SUPER_USER_EMAIL = '';
    process.env.SUPER_USER_PASSWORD = '';
    process.env.SUPER_USERNAME = '';
    chai.request(app)
      .post('/api/v1/role/superadmin/assign')
      .send({
        email: process.env.SUPER_USER_EMAIL,
        username: process.env.SUPER_USERNAME,
        password: process.env.SUPER_USER_PASSWORD,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.error.SUPER_USERNAME).to.equal('SUPER_USERNAME is required');
        expect(res.body.error.SUPER_USER_PASSWORD).to.equal('SUPER_USER_PASSWORD is required');
        expect(res.body.error.SUPER_USER_EMAIL).to.equal('SUPER_USER_EMAIL is required');
        done();
      });
  });

  it('should return 400 for required email field', (done) => {
    process.env.SUPER_USER_EMAIL = '';
    process.env.SUPER_USER_PASSWORD = 'password123';
    process.env.SUPER_USERNAME = 'superusername1';
    chai.request(app)
      .post('/api/v1/role/superadmin/assign')
      .send({
        email: process.env.SUPER_USER_EMAIL,
        username: process.env.SUPER_USERNAME,
        password: process.env.SUPER_USER_PASSWORD,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.error.SUPER_USER_EMAIL).to.equal('SUPER_USER_EMAIL is required');
        done();
      });
  });

  it('should return 400 for required password field', (done) => {
    process.env.SUPER_USER_EMAIL = 'test@test.com';
    process.env.SUPER_USER_PASSWORD = '';
    process.env.SUPER_USERNAME = 'superusername1';
    chai.request(app)
      .post('/api/v1/role/superadmin/assign')
      .send({
        email: process.env.SUPER_USER_EMAIL,
        username: process.env.SUPER_USERNAME,
        password: process.env.SUPER_USER_PASSWORD,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.error.SUPER_USER_PASSWORD).to.equal('SUPER_USER_PASSWORD is required');
        done();
      });
  });

  it('should return 400 for required password field', (done) => {
    process.env.SUPER_USER_EMAIL = 'test@test.com';
    process.env.SUPER_USER_PASSWORD = 'password123';
    process.env.SUPER_USERNAME = '';
    chai.request(app)
      .post('/api/v1/role/superadmin/assign')
      .send({
        email: process.env.SUPER_USER_EMAIL,
        username: process.env.SUPER_USERNAME,
        password: process.env.SUPER_USER_PASSWORD,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.error.SUPER_USERNAME).to.equal('SUPER_USERNAME is required');
        done();
      });
  });

  it('should return 400 for required password field', (done) => {
    process.env.SUPER_USER_EMAIL = 'test@test.';
    process.env.SUPER_USER_PASSWORD = 'password123';
    process.env.SUPER_USERNAME = 'superusername1';
    chai.request(app)
      .post('/api/v1/role/superadmin/assign')
      .send({
        email: process.env.SUPER_USER_EMAIL,
        username: process.env.SUPER_USERNAME,
        password: process.env.SUPER_USER_PASSWORD,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.error.email).to.equal('Invalid email');
        done();
      });
  });

  it('should return 409 for existing email', (done) => {
    process.env.SUPER_USER_EMAIL = 'uwa@noldor.com';
    process.env.SUPER_USER_PASSWORD = 'password123';
    process.env.SUPER_USERNAME = 'superuser';
    chai.request(app)
      .post('/api/v1/role/superadmin/assign')
      .send({
        email: process.env.SUPER_USER_EMAIL,
        username: process.env.SUPER_USERNAME,
        password: 'password123',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(409);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Cannot assign role to existing email');
        done();
      });
  });

  it('should return 200 on successfully creating super admin', (done) => {
    process.env.SUPER_USER_EMAIL = 'noldor_superadmin@test.com';
    process.env.SUPER_USER_PASSWORD = 'password123';
    process.env.SUPER_USERNAME = 'superuser';
    chai.request(app)
      .post('/api/v1/role/superadmin/assign')
      .send({
        email: process.env.SUPER_USER_EMAIL,
        username: process.env.SUPER_USERNAME,
        password: process.env.SUPER_USER_PASSWORD
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Super admin successfully created');
        superUserDetails.token = res.body.token;
        done();
      });
  });
  it('should login the super user', (done) => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send({
        email: process.env.SUPER_USER_EMAIL,
        password: process.env.SUPER_USER_PASSWORD
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('successfully logged in');
        superUserDetails.token = res.body.token;
        done();
      });
  });

  it('should return 409 if super admin already exists', (done) => {
    process.env.SUPER_USER_EMAIL = 'anasey@test.com';
    process.env.SUPER_USER_PASSWORD = 'password123';
    process.env.SUPER_USERNAME = 'superuser123';
    chai.request(app)
      .post('/api/v1/role/superadmin/assign')
      .send({
        email: process.env.SUPER_USER_EMAIL,
        username: process.env.SUPER_USERNAME,
        password: process.env.SUPER_USER_PASSWORD
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(409);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Super Admin already exist. Contact the developers');
        done();
      });
  });
  it('should return 401 for not providing a token', (done) => {
    chai.request(app)
      .put('/api/v1/role/admin/assign')
      .send({
        username: 'fred'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Access denied. No token provided.');
        done();
      });
  });

  it('should return 401 for not providing a token', (done) => {
    chai.request(app)
      .put('/api/v1/role/admin/assign')
      .set('x-token', fakeToken)
      .send({
        username: 'fred'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('invalid token');
        done();
      });
  });

  it('should not permit users to assign admins', (done) => {
    chai.request(app)
      .put('/api/v1/role/admin/assign')
      .set('x-token', nonAdminuserDetails.token)
      .send({
        username: 'fred'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('you cannot perform this operation');
        done();
      });
  });

  it('should return 400 to require username', (done) => {
    chai.request(app)
      .put('/api/v1/role/admin/assign')
      .set('x-token', superUserDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('username is required');
        done();
      });
  });

  it('should return 400 to require username', (done) => {
    chai.request(app)
      .put('/api/v1/role/admin/assign')
      .send({
        username: '',
      })
      .set('x-token', superUserDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('username is required');
        done();
      });
  });

  it('should return 400 to request a valid username', (done) => {
    chai.request(app)
      .put('/api/v1/role/admin/assign')
      .send({
        username: 'non_alphanumeric',
      })
      .set('x-token', superUserDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Username is invalid, user only aphanumeric characters');
        done();
      });
  });

  it('should return 404 for username that does not exist', (done) => {
    chai.request(app)
      .put('/api/v1/role/admin/assign')
      .set('x-token', superUserDetails.token)
      .send({
        username: 'nonexistinguser'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('username does not exist');
        done();
      });
  });

  it('should return 200 for assigning an admin role', (done) => {
    const username = 'fred';
    chai.request(app)
      .put('/api/v1/role/admin/assign')
      .set('x-token', superUserDetails.token)
      .send({
        username,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal(`${username} is assigned an admin role`);
        done();
      });
  });

  it('should return 304 for not modified admin role assignment', (done) => {
    chai.request(app)
      .put('/api/v1/role/admin/assign')
      .set('x-token', superUserDetails.token)
      .send({
        username: 'fred'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(304);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return 401 for not providing a token', (done) => {
    chai.request(app)
      .put('/api/v1/role/admin/unassign')
      .send({
        username: 'fred'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Access denied. No token provided.');
        done();
      });
  });
  it('should return 401 for not providing a token', (done) => {
    chai.request(app)
      .put('/api/v1/role/admin/unassign')
      .set('x-token', fakeToken)
      .send({
        username: 'fred'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('invalid token');
        done();
      });
  });

  it('should not permit users to unassign admins', (done) => {
    chai.request(app)
      .put('/api/v1/role/admin/unassign')
      .set('x-token', nonAdminuserDetails.token)
      .send({
        username: 'fred'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(401);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('you cannot perform this operation');
        done();
      });
  });

  it('should return 400 to require username', (done) => {
    chai.request(app)
      .put('/api/v1/role/admin/unassign')
      .set('x-token', superUserDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('username is required');
        done();
      });
  });

  it('should return 400 to require username', (done) => {
    chai.request(app)
      .put('/api/v1/role/admin/unassign')
      .send({
        username: '',
      })
      .set('x-token', superUserDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('username is required');
        done();
      });
  });

  it('should return 400 to request a valid username', (done) => {
    chai.request(app)
      .put('/api/v1/role/admin/unassign')
      .send({
        username: 'non_alphanumeric',
      })
      .set('x-token', superUserDetails.token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Username is invalid, user only aphanumeric characters');
        done();
      });
  });

  it('should return 404 for username that does not exist', (done) => {
    chai.request(app)
      .put('/api/v1/role/admin/unassign')
      .set('x-token', superUserDetails.token)
      .send({
        username: 'nonexistinguser'
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('username does not exist');
        done();
      });
  });

  it('should return 200 for unassigning an admin role', (done) => {
    const username = 'fred';
    chai.request(app)
      .put('/api/v1/role/admin/unassign')
      .set('x-token', superUserDetails.token)
      .send({
        username,
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal(`${username} has been unassigned admin privilledges`);
        done();
      });
  });
});
