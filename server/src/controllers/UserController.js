import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Models from '../db/models';
import Helpers from '../helpers/index';
import Mailer from '../helpers/sendMail';
import UpdateWorker from '../workers/UpdateWorker';
import templates from '../helpers/templates';
import httpResponse from '../helpers/response';
import logger from '../helpers/logger';

const { User } = Models;
const html = templates.verifyEmailTemplate;

dotenv.config();

/**
 * @class { UserController }
 * @description { Handles Users Requests }
 */
class UserController {
  /**
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

      const hashedPassword = Helpers.decodePassword(password);
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
            role: data.dataValues.role
          };
          const token = Helpers.issueToken(payload);
          const mailOption = {
            from: 'Authors Haven <no-reply@authorshaven.com>',
            to: email,
            subject: 'Welcome to Authors Haven',
            html: html(username, req.headers.host, UpdateWorker.hashGenerator(email))
          };
          try {
            Mailer.sendVerificationEmail(mailOption);
          } catch (err) {
            throw err;
          }
          return res.header('x-token', token).status(200).json({
            user: {
              success: true,
              message: 'Registration successful',
              id: data.dataValues.id,
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
      },
      paranoid: false
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'email does not exist'
          });
        }
        if (user.deactivatedByAdmin) {
          return res.status(403).json({
            success: false,
            // eslint-disable-next-line max-len
            message: 'Your account has been deactivated by the admin, please contact them for more details.'
          });
        }
        if (user.deletedAt) {
          user.setDataValue('deletedAt', null);
          user.save({ paranoid: false });
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
          role: user.dataValues.role
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
   *
   * @param { object } req
   * @param { object } res
   * @returns { object } json
   */
  static async verifyEmail(req, res) {
    const { id, username, email } = req.user.payload;
    const user = await User.findOne({
      where: {
        username,
        emailVerificationHash: req.query.id,
      }
    });
    if (user) {
      if (user.confirmEmail === true) {
        return httpResponse.badResponse(res, 400, 'Your have already verified your email');
      }
      try {
        const isUpdated = User.update({
          confirmEmail: true
        }, {
          where: {
            id,
          }
        });
        if (!isUpdated) {
          return logger.error('Could not update record, please try again');
        }
        return httpResponse.goodResponse(res, 200, `Your email ${email} was successfully verified`);
      } catch (err) {
        logger.error(err);
        throw err;
      }
    }
    return httpResponse.badResponse(res, 401, 'Verification failed, could not find user');
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
        return httpResponse.goodResponse(res, 200, 'successfully retrieved users list', users);
      })
      .catch(err => httpResponse.badResponse(res, 200, 'Internal server error', err.message));
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
    User.update({ forgotPasswordHash: token }, { where: { id } })
      .then((data) => {
        if (data) {
          const resetPasswordTemplate = Helpers.templates.resetPassword(req.headers.host, token);
          const mailOptions = {
            to: providedEmail,
            from: 'Authors Haven <no-reply@authorshaven.com>',
            subject: 'Reset your password',
            html: resetPasswordTemplate,
          };
          Helpers.sendMail.sendEmail(mailOptions);
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
          const mailOptions = {
            to: email,
            from: 'Authors Haven <no-reply@authorshaven.com>',
            subject: 'Reset your password',
            html: notifyPasswordChange,
          };
          Helpers.sendMail.sendEmail(mailOptions);
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
      const followings = await profile.countFollower();
      const followers = await profile.countFollowing();
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
          avatarUrl,
          followers,
          followings
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

  /**
 * @param {*} req
 * @param {*} res
 * @return {*} json
 */
  static async notifications(req, res) {
    const { id } = req.user.payload;
    const optStatus = await User.findOne({
      where: {
        id,
        notification: true
      }
    });
    if (!optStatus) {
      await User.update({
        notification: true
      }, { where: { id } });
      return res.status(200).json({
        success: true,
        message: 'you have opted in for notifications'
      });
    }
    if (optStatus) {
      await User.update({
        notification: false
      }, { where: { id } });
      return res.status(200).json({
        success: true,
        message: 'you have opted out for notifications'
      });
    }
  }
}

export default UserController;
