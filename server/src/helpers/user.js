import UserWorker from '../workers/UserWorker';
/**
 * @description { verifies users input}
 */
class UserHelper {
  /**
     *
     * @param {*} email
     * @param {*} username
     * @param {object} role
     * @param {object} res
     * @returns {*} JSON/true
     */
  static async validateRoleEntries(email, username, role, res) {
    try {
      const checkEmail = await UserWorker.checkEmail(email, res);
      if (checkEmail) {
        res.status(409).json({
          success: false,
          message: 'Cannot assign role to existing email',
        });
        return null;
      }

      const checkUsername = await UserWorker.checkUsername(username, res);
      if (checkUsername) {
        res.status(409).json({
          success: false,
          message: 'Cannot assign role to existing username',
        });
        return null;
      }
      const existingSuperAdmin = await UserWorker.checkRole(role, res);
      if (existingSuperAdmin) {
        res.status(409).json({
          success: false,
          message: 'Super Admin already exist. Contact the developers',
        });
        return null;
      }

      return true;
    } catch (error) {
      return res.status(400).json({
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
   * @returns {JSON} json
   */
  static async validateAdminRole(username, res) {
    const existingUser = await UserWorker.checkUsername(username, res);
    if (!existingUser) {
      res.status(404).json({
        success: false,
        message: 'username does not exist'
      });
      return null;
    }
    return existingUser;
  }
}

export default UserHelper;
