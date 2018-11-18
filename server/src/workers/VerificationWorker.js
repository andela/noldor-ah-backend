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
  static isVerified(request, response, next) {
    const userId = request.user.payload.id;
    User.findAndCountAll({
      where: {
        id: userId,
        confirmEmail: false
      }
    }).then((data) => {
      if (data.count > 0) {
        return httpResponse.badResponse(response, 403,
          'Your email is awaiting verification, please verify and try again');
      }
    });
    next();
  }
}

export default confirmAccount;
