import Models from '../db/models/index';

const {
  User,
  Notification, Events
} = Models;


/**
 * @class { NotificationController }
 * @description { controller for notification }
 */
class NotificationController {
  /**
   *
   * @param {userId} userId
   * @param { res } res
   * @returns { boolean} BOOLEAN
   */
  static async markReadNotifications(userId, res) {
    try {
      const markAsRead = await Notification.update({
        status: true,
      }, {
        where: {
          userId,
        }
      });
      if (!markAsRead) {
        return false;
      }
      return true;
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          message: error,
        }
      });
    }
  }

  /**
   *
   * @param {user} userId
   * @param {status} status
   * @param { res } res
   * @returns { boolean} BOOLEAN
   */
  static async getUserNotifications(userId, status, res) {
    try {
      const read = await Notification.findAll({
        where: {
          userId,
          status,
        },
        include: [{
          model: User, attributes: ['username', 'bio', 'avatarUrl']
        },
        {
          model: Events, attributes: ['eventType']
        }
        ]
      });

      if (!read) {
        return null;
      }
      return read;
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          message: error,
        }
      });
    }
  }

  /**
 *
 * @param {*} req
 * @param {*} res
 * @return {*} json
 */
  static async getNotification(req, res) {
    try {
      const userId = req.user.payload.id;
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
      const unRead = await NotificationController.getUserNotifications(userId, false, res);
      const read = await NotificationController.getUserNotifications(userId, true, res);
      const notifications = {};
      const data = {};
      const readData = {};
      if (!unRead.length) {
        notifications.current = 'You have no new notifications';
      }

      if (unRead.length) {
        notifications.current = unRead.map((x) => {
          data.message = `${x.User.username} ${x.Event.action}`;
          data.articleId = x.eventId;
          return data;
        });
      }
      if (read.length) {
        notifications.readNotification = read.map((x) => {
          readData.message = `${x.User.username} ${x.Event.action}`;
          readData.articleId = x.eventId;
          return readData;
        });
      }
      await NotificationController.markReadNotifications(userId, res);
      if (unRead && !read.length) {
        return res.status(200).json({
          success: true,
          current: notifications.current
        });
      }
      if (unRead && read) {
        return res.status(200).json({
          success: true,
          notifications,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          message: error.message
        }
      });
    }
  }
}

export default NotificationController;
