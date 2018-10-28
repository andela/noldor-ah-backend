import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userToken from '../middlewares/token';
import Models from '../net/models';

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
  static register(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmEmail,
      username,
      bio,
      avatarUrl
    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    const hassedPassword = hashed;

    User.create({
      firstName,
      lastName,
      username,
      email,
      password: hassedPassword,
      confirmEmail,
      bio,
      avatarUrl,
    })
      .then((data) => {
        const payload = {
          id: data.dataValues.id,
          email: data.dataValues.email,
        };
        const token = userToken.issue(payload);
        return res.status(200).json({
          user: {
            email: data.dataValues.email,
            token,
            username: data.dataValues.username,
            bio: data.dataValues.bio,
            image: data.dataValues.image,
          }
        });
      })
      .catch(error => res.status(500).json({
        success: false,
        error: {
          msg: error.message,
        }
      }));
  }

  /**
 *
 * @param {*} req
 * @param {*} res
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
            message: 'user does not exist. Please signup.'
          });
        }
        const storedHashedPassword = user.password;
        const correctPassword = bcrypt.compareSync(password, storedHashedPassword);
        if (!correctPassword) {
          return res.status(400).json({
            success: false,
            message: 'username or password incorrect',
          });
        }
        const token = jwt.sign({
          id: user.dataValues.id,
          email: user.dataValues.email
        }, process.env.PRIVATE_KEY, {
          expiresIn: '1w',
        });
        return res.header('x-token', token).status(200).json({
          success: true,
          message: `successfully logged in. Welcome back ${user.dataValues.firstName} ${user.dataValues.lastName}`,
          token
        });
      })
      .catch(error => res.status(500).json({
        success: false,
        error: {
          msg: error.message,
        }
      }));
  }
}

export default UserController;
