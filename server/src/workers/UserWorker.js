import models from '../db/models';

const { User } = models;
/**
 * @description { verifies users input}
 */
class UserWorker {
  /**
     *
     * @param {*} email
     * @param {*} res
     * @return {*} JSON
     */
  static async checkEmail(email, res) {
    try {
      const userEmail = await User.findOne({
        where: {
          email,
        }
      });
      if (!userEmail) {
        return null;
      }
      return userEmail;
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      });
    }
  }

  /**
   *
   * @param {*} username
   * @param {*} res
   * @returns {*} JSON
   */
  static async checkUsername(username, res) {
    try {
      const existingUsername = await User.findOne({
        where: {
          username,
        }
      });

      if (!existingUsername) {
        return null;
      }
      return existingUsername;
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          message: error.message
        }
      });
    }
  }

  /**
 * @param {*} role
 * @param {*} res
 * @returns { JSON } json
 */
  static async checkRole(role, res) {
    try {
      const currentRole = await User.findOne({
        where: {
          role,
        }
      });

      if (!role) {
        return null;
      }
      return currentRole;
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      });
    }
  }

  /**
 *
 * @param {*} username
 * @param {*} email
 * @param {*} password
 * @param {*} role
 * @param {*} res
 * @returns { JSON } json
 */
  static async createSuperAdmin(username, email, password, role, res) {
    try {
      const createSuperAdminRole = await User.create({
        username, email, password, role,
      });
      return createSuperAdminRole;
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          message: error.message
        }
      });
    }
  }

  /**
   *
   * @param {*} role
   * @param {*} userId
   * @param {*} res
   * @returns { JSON } JSON
   */
  static async updateRole(role, userId, res) {
    try {
      const updateUserRole = await User.update({
        role,
      }, {
        where: {
          id: userId,
        }
      });
      return updateUserRole;
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          message: error.message
        }
      });
    }
  }
}
export default UserWorker;
