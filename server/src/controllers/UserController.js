import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import userToken from '../middlewares/token';
import Models from '../db/models';

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
            username: data.dataValues.username
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
          username: user.dataValues.username
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
