import Models from '../db/models/index';

const {
  User
} = Models;


/**
 * @class { NotificationController }
 * @description { controller for notification }
 */
class NotificationController {
  /**
 *
 * @param {*} req
 * @param {*} res
 * @return {*} json
 */
  static async getNotification(req, res) {
    const user = await User.findOne({
      where: {
        id: req.user.payload.id,
        notification: true
      }
    });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: 'you have opted out of getting notifications'
      });
    }
    const usersNotifications = await user.getNotification({
      where: {
        status: false
      },
      include: [
        {
          model: User, attributes: ['username']
        }
      ]
    });
    if (!usersNotifications.length) {
      return res.status(404).json({
        success: false,
        message: 'You have no new notification'
      });
    }
    const data = {};
    const notifications = usersNotifications.map((x) => {
      data.message = `${x.User.username} ${x.action}`;
      data.articleId = x.eventId;
      return data;
    });
    // const id = await usersNotifications.map(x => x.id);

    // await user.removeNotification(id);

    return res.status(200).json({
      success: true,
      notifications
    });
  }
}

export default NotificationController;
