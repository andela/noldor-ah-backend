import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
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
      const hassedPassword = hashed;

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
        password: hassedPassword,
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
            message: 'email or password incorrect'
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
}

export default UserController;
