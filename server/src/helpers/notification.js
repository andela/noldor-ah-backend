import templates from './templates';
import Models from '../db/models/index';


const { Events, User, Article } = Models;


/**
 * @class { NotificationController }
 * @description { controller for notification }
 */
class NotificationHelper {
  /**
     *
     * @param {*} actionId  articleId
     * @param {*} actionType article/comment
     * @param {*} actorId   userId
     * @return {*} null
     */
  static async addNotification(actionId, actionType, actorId) {
    const data = {};
    if (actionType === 'article') {
      const followersId = await this.getOptedInFollowersId(actorId);
      if (!followersId) {
        return null;
      }
      data.sendTo = followersId;
    }
    if (actionType === 'comment') {
      const articleFollowersId = await this.getOptedInFollowersId(actionId);
      if (!articleFollowersId) {
        return null;
      }
      data.sendTo = articleFollowersId;
    }
    try {
      const action = await Events.create({
        userId: actorId, articleId: actionId, eventType: actionType
      });

      await action.addNotified(data.sendTo);

      const emails = await action.getNotified().map(x => x.email);

      await this.sendEmailNotifications(actorId, actionId, actionType, emails);
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
        id,
        notification: true
      }
    });
    if (!optedUser) {
      return null;
    }
    const followersId = await optedUser.getFollower({ attributes: ['id'] });
    return followersId.map(x => x.id);
  }

  /**
   * @param {*} id
   * @return {*} array/null
   */
  static async getReactorsId(id) {
    const article = Article.findByPk(id);
    const reactors = await article.getUsers({
      where: { notification: true }
    }).map(x => x.id);
    if (!reactors) {
      return null;
    }
    return reactors;
  }

  /**
   * @param {*} userId
   * @param {*} articleId
   * @param {*} eventType
   * @param {*} emails
   * @return {*} json
   */
  static async sendEmailNotifications(userId, articleId, eventType, emails) {
    const user = await User.findOne({
      where: {
        id: userId
      },
      attributes: ['username']
    });
    const { username } = user.dataValues;

    const articleTitle = await Article.findOne({
      where: {
        id: articleId
      },
      attributes: ['title']
    });
    const { title } = articleTitle.dataValues;
    const message = {};
    if (eventType === 'article') {
      message.content = `${username} has published a new article`;
      message.subject = 'New Article Notification';
    }
    if (eventType === 'comment') {
      message.content = `${title} has a new comment`;
      message.subject = 'New Comment Notification';
    }
    const optOutUrl = '';
    const notificationTemplate = await templates.newArticleNotification(`${articleId}`,
      message.content, title, optOutUrl);
    // send message goes here
    return null;
  }
}
export default NotificationHelper;
