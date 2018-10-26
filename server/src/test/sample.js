import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';

const app = express();
app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to Authors Haven' }));


const { expect } = chai;
chai.use(chaiHttp);

describe('Sample API for test', () => {
  it('should return a welcome message', (done) => {
    chai.request(app)
      .get('/')
      .end((error, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to Authors Haven');
        done();
      });
  });
});
