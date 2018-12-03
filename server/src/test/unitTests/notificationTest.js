import chaiHttp from 'chai-http';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import Helpers from '../../helpers/index';
import testData from '../integrationTests/notificationTest';

const notification = Helpers.NotificationHelper;
const { expect } = chai;
chai.use(chaiHttp);


describe('Unit testing for send email notifications', () => {
  it('should return null on successfully sending message', async () => {
    const baseUrl = 'noldor.com';
    const eventType = 'comment';
    const user1 = testData.token;
    const data = jwt.decode(user1);
    const userId = data.payload.id;
    const { articleId } = testData;
    const emails = [data.payload.email];

    const response = await notification
      .sendEmailNotifications(baseUrl, userId, articleId, eventType, emails);
    expect(response).to.be.equal(null);
  });
});
