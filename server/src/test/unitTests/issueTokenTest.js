import chaiHttp from 'chai-http';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import issueToken from '../../helpers/issueToken';

const { expect } = chai;
chai.use(chaiHttp);

const payload = {
  id: 1,
  name: 'oluseyi',
  email: 'oluseyi@test.com'
};

describe('unit testing for token issuer', () => {
  it('should return a string', (done) => {
    const token = issueToken(payload);
    expect(token).to.be.a('string');
    done();
  });

  it('should return undefined for no payload passed', (done) => {
    const token = issueToken();
    const decodedToken = jwt.decode(token);
    expect(decodedToken.id).to.be.equal(undefined);
    expect(decodedToken.name).to.be.equal(undefined);
    expect(decodedToken.email).to.be.equal(undefined);
    expect(decodedToken.email).to.be.equal(undefined);
    done();
  });

  it('should equal the payload passed in once decoded', (done) => {
    const token = issueToken(payload);
    const decodedToken = jwt.decode(token);
    expect(decodedToken.payload.id).to.be.equal(payload.id);
    expect(decodedToken.payload.name).to.be.equal(payload.name);
    expect(decodedToken.payload.email).to.be.equal(payload.email);
    done();
  });
});
