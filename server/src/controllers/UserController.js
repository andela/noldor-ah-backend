import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import userToken from '../middlewares/token';
import Models from '../db/models';

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
    const foundEmail = await User.findOne({ where: { email: providedEmail }, attributes: ['id', 'email', 'forgotPasswordHash'] });
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
    User.update({ forgotPasswordHash: token },
      { where: { id } })
      .then((data) => {
        if (data) {
          // using SendGrid's v3 Node.js Library
          // https://github.com/sendgrid/sendgrid-nodejs
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          const emailTemplate = {
            to: providedEmail,
            subject: 'Reset your password',
            html:
            `<div> 
              <p>You told us you forgot your password. If you really did, click <a href=http://${req.headers.host}/api/v1/users/forgot/${token}> here</a> to get a new one</p>
            
             <div>
             <p> 
                <a href="http://${req.headers.host}/api/v1/users/forgot/${token}">Choose a new password</a> 
             </p>
            </div>
           
              <p>If you didn't mean to change your password, you can just ignore this email; </br>
            Your password will not be changed.</p>
            </div>
            `
          };
          const message = {
            to: emailTemplate.to,
            from: 'no-reply@authorshaven.com',
            subject: emailTemplate.subject,
            html: emailTemplate.html,
          };
          sgMail.send(message);
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
      User.update({ password: hashedPassword },
        { where: { id } })
        .then((data) => {
          if (!data) {
            return res.status(503).json({
              success: false,
              message: 'password cannot be updated. try again',
            });
          }
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
}

export default UserController;
