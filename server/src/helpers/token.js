import jwt from 'jsonwebtoken';
/**
 *@class { Class to hold token helpers }
 */
class UserToken {
  /**
   * @description { Issues token to users }
   * @param { object } payload
   * @param { object } expiresIn
   * @returns { string } token
   */
  static issue(payload, expiresIn = '1w') {
    const token = jwt.sign({
      payload,
    }, process.env.PRIVATE_KEY, {
      expiresIn,
    });
    return token;
  }
}

export default UserToken;
