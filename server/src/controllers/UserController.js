import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Models from '../db/models';
import Helpers from '../helpers/index';

const { User } = Models;

dotenv.config();

/**
 * @class { UserController }
 * @description { Handles Users Requests }
 */
class UserController {
  /**
     *
     * @param { object } req
     * @param { object } res
     * @returns { object } Json
     */
  static async register(req, res) {
    try {
      const {
        email,
        password,
        username,
      } = req.body;

      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(password, salt);
      const hashedPassword = hashed;

      const foundUsername = await User.findOne({ where: { username } });
      const foundUserEmail = await User.findOne({ where: { email } });
      if (foundUsername) {
        return res.status(409).json({
          success: false,
          message: `Username ${username} aready exist`,
        });
      }
      if (foundUserEmail) {
        return res.status(409).json({
          success: false,
          message: `Email ${email} aready exist`,
        });
      }

      User.create({
        username,
        email,
        password: hashedPassword,
      })
        .then((data) => {
          const payload = {
            id: data.dataValues.id,
            email: data.dataValues.email,
            username: data.dataValues.username,
          };
          const token = Helpers.issueToken(payload);
          return res.header('x-token', token).status(200).json({
            user: {
              success: true,
              message: 'registration successful',
              email: data.dataValues.email,
              token,
              username: data.dataValues.username,
            }
          });
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      });
    }
  }

  /**
 *
 * @param { object } req
 * @param { object } res
 * @returns { object } json
 */
  static login(req, res) {
    const {
      email,
      password,
    } = req.body;

    User.findOne({
      where: {
        email,
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'email does not exist'
          });
        }
        const storedHashedPassword = user.password;
        const correctPassword = bcrypt.compareSync(password, storedHashedPassword);
        if (!correctPassword) {
          return res.status(400).json({
            success: false,
            message: 'email or password incorrect',
          });
        }

        const payload = {
          id: user.dataValues.id,
          email: user.dataValues.email,
          username: user.dataValues.username,
        };
        const token = Helpers.issueToken(payload);
        return res.header('x-token', token).status(200).json({
          success: true,
          message: 'successfully logged in',
          token,
          id: user.dataValues.id
        });
      })
      .catch(error => res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      }));
  }

  /**
   * @description { get the list of users information }
   * @param { object } req
   * @param { object } res
   * @returns { json } json
   */
  static getAllUser(req, res) {
    User.findAll({
      attributes: ['id', 'username', 'email']
    })
      .then((data) => {
        const users = [];
        data.forEach((info) => {
          users.push(info.dataValues);
        });
        return res.status(200).json({
          success: true,
          message: 'successfully retrieved users list',
          users,
        });
      })
      .catch(err => res.status(500).json({
        success: false,
        message: 'internal server error',
        error: {
          messgae: err.message,
        }
      }));
  }

  /**
   * @description { handles user's forget password }
   * @param { object } req
   * @param { object } res
   * @returns { json } json
   */
  static async forgetPassword(req, res) {
    const providedEmail = req.body.email;
    const foundEmail = await User.findOne({
      where: { email: providedEmail },
      attributes: ['id', 'email', 'forgotPasswordHash']
    });
    if (!foundEmail) {
      return res.status(404).json({
        success: false,
        message: 'Email does not exist',
      });
    }
    const { id, email } = foundEmail.dataValues;
    const payload = {
      id,
      email,
    };
    const token = Helpers.issueToken(payload, '1h');
    User.update(
      { forgotPasswordHash: token }, { where: { id } }
    )
      .then((data) => {
        if (data) {
          const sender = 'no-reply@authorshaven.com';
          const subject = 'Reset your password';
          const resetPasswordTemplate = Helpers.templates.resetPassword(req.headers.host, token);
          Helpers.sendMail(providedEmail, sender, subject, resetPasswordTemplate);
          return res.status(200).json({
            success: true,
            message: 'Check your email for further instructions',
          });
        }
      }).catch(error => res.status(500).json({
        susccess: false,
        message: 'internal server error',
        error: {
          error: error.message,
        }
      }));
  }

  /**
   * @description { resets user's password }
   * @param { object } req
   * @param { object } res
   * @returns { json } json
   */
  static async resetPassword(req, res) {
    const {
      password
    } = req.body;
    const { hash } = req.params;
    const requestingUser = [];
    let verifiedUser = false;
    jwt.verify(hash, process.env.PRIVATE_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'invalid token',
          expiredAt: err.expiredAt,
        });
      }
      if (!err) {
        verifiedUser = true;
        requestingUser.push(decoded.payload);
      }
    });
    if (verifiedUser) {
      const {
        id,
        email,
      } = requestingUser[0];
      const requestingUserDetail = await User.findOne({ where: { id } });
      if (!requestingUserDetail) {
        return res.status(404).json({
          success: false,
          message: 'user does not exist',
        });
      }
      if (email !== requestingUserDetail.dataValues.email) {
        return res.status(401).json({
          success: false,
          message: 'Email does not match',
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(password, salt);
      const hashedPassword = hashed;
      User.update(
        { password: hashedPassword },
        { where: { id } }
      )
        .then((data) => {
          if (!data) {
            return res.status(503).json({
              success: false,
              message: 'password cannot be updated. try again',
            });
          }
          const notifyPasswordChange = Helpers.templates.notifyPaswordChange(req.headers.host);
          const sender = 'no-reply@authorshaven.com';
          const subject = 'Successful Password Reset';
          Helpers.sendMail(email, sender, subject, notifyPasswordChange);
          return res.status(200).json({
            success: true,
            message: 'password has been updated'
          });
        })
        .catch(error => res.status(500).json({
          success: false,
          message: 'internal server error',
          error: {
            error: error.message,
          }
        }));
    }
  }

  /**
   * @description Enable a user view profile even if not authorized
   * @param { object } req
   * @param { object } res
   * @returns { object } json
   */
  static async viewUserProfile(req, res) {
    try {
      const { userId } = req.params;
      const noUser = await User.findByPk(userId);
      if (!noUser) {
        return res.status(404).json({
          success: false,
          message: 'User does not exist'
        });
      }
      const profile = await User.findByPk(userId);
      const {
        id,
        firstName,
        lastName,
        username,
        email,
        bio,
        avatarUrl
      } = profile;
      return res.status(200).json({
        success: true,
        message: 'Retrieval successful',
        data: {
          id,
          firstName,
          lastName,
          username,
          email,
          bio,
          avatarUrl
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      });
    }
  }

  /**
   * @description Enable a user edit profile only if authorized
   * @param { object } req
   * @param { object } res
   * @returns { object } json
   */
  static async editUserProfile(req, res) {
    try {
      if (req.file) {
        req.body.avatarUrl = req.file.secure_url;
      }
      const { userId } = req.params;
      const decodedId = req.user.payload.id;
      const noUser = await User.findByPk(userId);
      if (!noUser) {
        return res.status(404).json({
          success: false,
          message: 'User does not exist'
        });
      }
      const userProfile = await User.findByPk(userId);
      if (userProfile.dataValues.id === decodedId) {
        const editProfile = await userProfile.update(req.body, {
          fields: Object.keys(req.body)
        });
        const {
          id,
          firstName,
          lastName,
          username,
          email,
          bio,
          avatarUrl,
          updatedAt
        } = editProfile;
        return res.status(205).json({
          success: true,
          message: 'Your edits have been saved',
          data: {
            id,
            firstName,
            lastName,
            username,
            email,
            bio,
            avatarUrl,
            updatedAt
          }
        });
      }
      return res.status(401).json({
        success: false,
        message: 'You are not authorized to do that!'
      });
    } catch (error) {
      res.status(409).json({
        success: false,
        error: error.message,
        message: error.errors[0].message,
      });
    }
  }

  /**
   * @description Deactivates a user profile only if authorized
   * @param { object } req
   * @param { object } res
   * @returns { object } json
   */
  static async deactivateUser(req, res) {
    try {
      const { userId } = req.params;
      const decodedId = req.user.payload.id;
      const softDeletingUser = await User.findByPk(userId);
      if (!softDeletingUser) {
        return res.status(404).json({
          success: false,
          message: 'User does not exist'
        });
      }
      if (softDeletingUser.id === decodedId) {
        await softDeletingUser.destroy();
        return res.status(204).json({});
      }
      if (softDeletingUser.id !== decodedId) {
        return res.status(401).json({
          success: false,
          message: 'You are not authorized to do this',
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          message: error.message,
        }
      });
    }
  }
}

export default UserController;
