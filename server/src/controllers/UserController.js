import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
<<<<<<< HEAD
=======
import jwt from 'jsonwebtoken';
>>>>>>> feat: user reset password functionality
import userToken from '../middlewares/token';
import Models from '../db/models';
import template from '../helpers/sendMail/templates';
import sendMail from '../helpers/sendMail/sendMail';

const { User, Article } = Models;
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

          const token = userToken.issue(payload);
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
        const token = userToken.issue(payload);
        return res.header('x-token', token).status(200).json({
          success: true,
          message: 'successfully logged in',
          token
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
    const token = userToken.issue(payload, '1h');
    User.update(
      { forgotPasswordHash: token }, { where: { id } }
    )
      .then((data) => {
        if (data) {
          const sender = 'no-reply@authorshaven.com';
          const subject = 'Reset your password';
          const resetPasswordTemplate = template.resetPassword(req.headers.host, token);
          sendMail(providedEmail, sender, subject, resetPasswordTemplate);
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
          const notifyPasswordChangeTemplate = template.notifyPaswordChange(req.headers.host);
          const sender = 'no-reply@authorshaven.com';
          const subject = 'Successful Password Reset';
          sendMail(email, sender, subject, notifyPasswordChangeTemplate);
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

  /**
   * @description Enable a user view profile even if not authorized
   * @param { object } req
   * @param { object } res
   * @returns { object } json
   */
  static async viewUserProfile(req, res) {
    try {
      const userId = Number(req.params.userId);

      if (Number.isInteger(userId) === false) {
        return res.status(400).json({
          success: false,
          message: 'Invalid params'
        });
      }

      const noUser = await User.findByPk(userId);
      if (noUser === null) {
        return res.status(404).json({
          success: false,
          message: 'User does not exist'
        });
      }

      const profile = await User.findByPk(userId, {
        attributes: ['username', 'email', 'bio', 'avatarUrl'],
        include: [{
          model: Article,
          as: 'articles',
          attributes: ['title', 'content']
        }],
      });

      return res.status(200).json({
        success: true,
        message: 'Retrieval successful',
        data: {
          profile,
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
      const userId = Number(req.params.userId);
      if (Number.isInteger(userId) === false) {
        return res.status(400).json({
          success: false,
          message: 'Invalid params'
        });
      }
      const decodedId = req.user.id;

      const userProfile = await User.findByPk(userId, {
        attributes: ['username', 'email', 'bio', 'avatarUrl'],
        include: [{
          model: Article,
          as: 'articles',
        }],
      });

      if (userProfile.id === decodedId) {
        const editProfile = await userProfile.update(req.body, {
          fields: Object.keys(req.body)
        });

        return res.status(205).json({
          success: true,
          message: 'Your edits have been saved',
          data: {
            editProfile,
          }
        });
      }

      return res.status(401).json({
        success: false,
        message: 'You are not unauthorized to do that!'
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
  static async deleteUser(req, res) {
    try {
      const userId = Number(req.params.userId);

      if (Number.isInteger(userId) === false) {
        return res.status(400).json({
          success: false,
          message: 'Invalid params'
        });
      }

      const deletingUser = await User.findByPk(userId);
      const decodedId = req.user.id;

      if (deletingUser.id === decodedId) {
        const deleteduser = await deletingUser.destroy({ force: true });
        return res.status(204).json({
          success: true,
          message: 'Account has been deleted',
          data: {
            deleteduser,
          }
        });
      }

      if (deletingUser.id !== decodedId) {
        return res.status(401).json({
          status: 'fail',
          message: 'You are not authorized to do this',
        });
      }

      return res.status(404).json({
        status: 'fail',
        message: 'User does not exist',
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
}

export default UserController;
