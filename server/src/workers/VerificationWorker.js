import models from '../db/models';
import httpResponse from '../helpers/response';

const { User } = models;
/**
 * @class { RatingHelper }
 * @description { }
 * @description { }
 */
class confirmAccount {
  /**
  * @description { check if a user is signed in }
  * @param { object } request
  * @param { object } response
  * @param { object } next
  * @returns { object } json Object
  */
  static async isVerified(request, response, next) {
    const userId = request.user.payload.id;
    const user = await User.findOne({
      where: {
        id: userId,
        confirmEmail: false
      }
    });

    if (user) {
      return httpResponse.badResponse(
        response, 403,
        'Your email is awaiting verification, please verify and try again'
      );
    }

    if (!user) {
      next();
    }
  }
}

export default confirmAccount;
