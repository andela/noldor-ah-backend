import dotenv from 'dotenv';
import Helpers from '../helpers/index';
import UserWorker from '../workers/UserWorker';

dotenv.config();

/**
 * @class { Role controller }
 * @description { Handles user, admin and super admin roles }
 */
class RoleController {
  /**
     * @param { object } req
     * @param { object } res
     * @returns { json } JSON
     */
  static async assignSuperUserRole(req, res) {
    const email = process.env.SUPER_USER_EMAIL;
    const password = process.env.SUPER_USER_PASSWORD;
    const username = process.env.SUPER_USERNAME;
    const role = Helpers.roleDefinition.superAdmin;

    const existing = await Helpers.UserHelper.validateRoleEntries(email, username, role, res);
    if (existing) {
      const hashedPassword = Helpers.decodePassword(password);
      const superAdmin = await UserWorker
        .createSuperAdmin(username, email, hashedPassword, role, res);
      if (superAdmin) {
        return res.status(200).json({
          success: true,
          message: 'Super admin successfully created'
        });
      }
    }
  }

  /**
   *
   * @param { object} req
   * @param { object } res
   * @returns { json } JSON
   */
  static async assignAdmin(req, res) {
    const {
      username
    } = req.body;

    const existingUser = await Helpers.UserHelper.validateAdminRole(username, res);
    if (existingUser) {
      const role = Helpers.roleDefinition;
      const { id } = existingUser;
      const existingUserRole = existingUser.role;
      const { currentUserPriviledge } = req;
      if (existingUserRole > currentUserPriviledge) {
        return res.status(401).json({
          success: false,
          message: 'You cannot assign a superuser an admin role'
        });
      }

      if (existingUser.role === role.admin) {
        return res.status(304).json({
          success: false,
          message: 'user is already an admin',
        });
      }
      const updateRole = await UserWorker.updateRole(role.admin, id, res);

      if (updateRole) {
        return res.status(200).json({
          success: true,
          message: `${username} is assigned an admin role`,
        });
      }
    }
  }

  /**
   * @param {*} req
   * @param {*} res
   * @returns { JSON } JSON
   */
  static async unassignAdmin(req, res) {
    const {
      username
    } = req.body;

    const existingUser = await Helpers.UserHelper.validateAdminRole(username, res);
    if (existingUser) {
      const role = Helpers.roleDefinition;
      const { id } = existingUser;
      const existingUserRole = existingUser.role;
      const { currentUserPriviledge } = req;
      if (currentUserPriviledge !== role.superAdmin) {
        return res.status(401).json({
          success: false,
          message: 'You don\'t have this level of priviledge'
        });
      }

      if (currentUserPriviledge === role.superAdmin && existingUserRole === role.superAdmin) {
        return res.status(401).json({
          success: false,
          messgae: 'You cannot unassign a super admin. Please contact the developers'
        });
      }

      const unassigned = await UserWorker.updateRole(role.user, id, res);
      if (unassigned) {
        return res.status(200).json({
          success: true,
          message: `${username} has been unassigned admin privilledges`,
        });
      }
    }
  }
}

export default RoleController;
