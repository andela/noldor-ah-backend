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
    // Set noNewNotification object here
    const notifications = {};
    const data = {};
    // append to the  noNewNotification object here and remove the return statements
    if (!usersNotifications.length) {
      notifications.current = 'You have no new notifications';
    }

    if (usersNotifications.length) {
      notifications.current = usersNotifications.map((x) => {
        data.message = `${x.User.username} ${x.action}`;
        data.articleId = x.eventId;
        return data;
      });
    }
    // Mark notification status as true

    // Get Notifications that status is set to true here
    // Set a readNotifications Object here
    // Append read notification into object
    // Return success messages

    return res.status(200).json({
      success: true,
      notifications
    });
  }

  static async markReadNotifications(req, res){
    const markAsRead = No
  }
}

export default NotificationController;
