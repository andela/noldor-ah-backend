import { Op } from 'sequelize';
import dotenv from 'dotenv';
import Models from '../db/models';

const { User } = Models;

dotenv.config();

/**
 * @class { Social Login DB Queries}
 * @description { Handles Users Requests }
 */
class SocialLogin {
  /**
  * @arg { id } id
  * @arg { username } username
  * @arg { email } email
  * @arg { password } password
  * @arg { done } done
  * @returns { object } user
  */
  static faceBookLogin(id, username, email, password, done) {
    const facebookAvi = `https://res.cloudinary.com/dstvcmycn/image/facebook/${id}.jpg`;

    User.findOrCreate({
      where: {
        [Op.or]: { email, facebookId: id },
      },
      defaults: {
        username,
        email,
        password: process.env.SocialMediaPassword,
        avatarUrl: facebookAvi,
        facebookId: id
      }
    })
      .spread((user) => {
        const socialUser = {
          id: user.id,
          email: user.email,
          username: user.username
        };
        return done(null, socialUser);
      });
  }

  /**
  * @arg { username } username
  * @arg { email } email
  * @arg { password } password
  * @arg { done } done
  * @returns { object } user
  */
  static googleLogin(username, email, password, done) {
    User.findOrCreate({
      where: { email },
      defaults: {
        username,
        email,
        password: process.env.SocialMediaPassword,
      }
    })
      .spread((user) => {
        const socialUser = {
          id: user.id,
          email: user.email,
          username: user.username
        };
        return done(null, socialUser);
      });
  }
}
export default SocialLogin;
