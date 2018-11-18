import chaiHttp from 'chai-http';
import chai from 'chai';
import UpdateWorker from '../../workers/UpdateWorker';
import Mailer from '../../helpers/sendMail';

const { expect } = chai;
chai.use(chaiHttp);

const mailOption = {
  from: 'no-reply@authorshaven.com',
  to: 'noldor-ah@gmail.com',
  subject: 'Welcome to Authors Haven',
  html: 'Test'
};

const values = {
  to: mailOption.to
};

describe('Unit Testing the update function', () => {
  it('should return an array of length 1', async () => {
    try {
      const result = await UpdateWorker.updateUserDetails(values);
      expect(result.length).to.equal(1);
    } catch (error) {
      throw (error);
    }
  });
  it('should return undefined', async () => {
    try {
      const sendMail = Mailer.sendEmail(mailOption);
      const sendVerificationEmail = Mailer.sendVerificationEmail(mailOption);
      expect(sendMail).to.equal(undefined);
      expect(sendVerificationEmail).to.equal(undefined);
    } catch (error) {
      throw (error);
    }
  });
});
