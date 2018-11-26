import templates from './templates';
import Models from '../db/models/index';
import sendMail from './sendMail';


const { Events, User, Article } = Models;


/**
 * @class { NotificationController }
 * @description { controller for notification }
 */
class NotificationHelper {
  /**
     *@param {*} baseUrl baseUrl
     * @param {*} actionId  articleId
     * @param {*} actionType article/comment
     * @param {*} actorId   userId
     * @return {*} null
     */
  static async addNotification(baseUrl, actionId, actionType, actorId) {
    const data = {};
    if (actionType === 'article') {
      const followersId = await this.getOptedInFollowersId(actorId);
      if (!followersId) {
        return null;
      }
      data.sendTo = followersId;
    }
    if (actionType === 'comment') {
      const reactorsId = await this.getReactorsId(actionId);

      if (!reactorsId) {
        return null;
      }
      data.sendTo = reactorsId;
    }
    try {
      const action = await Events.create({
        userId: actorId, articleId: actionId, eventType: actionType
      });

      await action.addNotified(data.sendTo);

      const emails = await action.getNotified().map(x => x.email);

      await this.sendEmailNotifications(baseUrl, actorId, actionId, actionType, emails);
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
 *
 * @param {*} id
 * @return {*} null/
 */
  static async getOptedInFollowersId(id) {
    const optedUser = await User.findOne({
      where: {
        id
      }
    });
    if (!optedUser) {
      return null;
    }
    const followersId = await optedUser.getFollower({
      where: {
        notification: true,
      },
      attributes: ['id']
    });
    return followersId.map(x => x.id);
  }

  /**
   * @param {*} id
   * @return {*} array/null
   */
  static async getReactorsId(id) {
    const article = await Article.findByPk(id);
    const reactors = await article.getUsers({
      where: { notification: true }
    }).map(x => x.id);
    if (!reactors) {
      return null;
    }
    return reactors;
  }

  /**
   * @param {*} baseUrl
   * @param {*} userId
   * @param {*} articleId
   * @param {*} eventType
   * @param {*} emails
   * @return {*} json
   */
  static async sendEmailNotifications(baseUrl, userId, articleId, eventType, emails) {
    const user = await User.findOne({
      where: {
        id: userId
      },
      attributes: ['username']
    });
    if (!user) {
      return true;
    }
    const { username } = user.dataValues;
    const articleTitle = await Article.findOne({
      where: {
        id: articleId
      },
      attributes: ['title']
    });
    if (!articleTitle) {
      return true;
    }
    const { title } = articleTitle.dataValues;
    const message = {};
    let url = '';
    const optOutUrl = `http://${baseUrl}/api/v1/users/notifications/opt`;

    if (eventType === 'article') {
      message.content = `${username} has published a new article`;
      message.subject = 'New Article Notification';
      url = `http://${baseUrl}/api/v1/articles/${articleId}/`;
    }

    if (eventType === 'comment') {
      message.content = `${title} has a new comment`;
      message.subject = 'New Comment Notification';
      url = `http://${baseUrl}/api/v1/articles/${articleId}/comments`;
    }

    const notificationTemplate = await templates.usersNotification(message.content, url, optOutUrl);
    emails.forEach(async (email) => {
      const mailOption = {
        from: 'Authors Haven <no-reply@authorshaven.com>',
        to: email,
        subject: message.subject,
        html: notificationTemplate
      };
      await sendMail.sendEmail(mailOption);
    });
    return null;
  }
}
export default NotificationHelper;
