import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
 *@class{Token}
 *@description { Issue token to users on successful registration}
 *@description{ validate user token }
 */
class Token {
  /**
   * @description { Issues token to users }
   * @param { object } payload
   * @param { object } lifeSpan
   * @returns { string } token
   */
  static issue(payload) {
    const token = jwt.sign({
      payload,
    }, process.env.PRIVATE_KEY, {
      expiresIn: '1w',
    });
    return token;
  }

  /**
 *@description { validates user token }
 * @param { object } req
 * @param { object } res
 * @param { function } next
 * @returns { object } user object on request body
 */
  static validateToken(req, res, next) {
    const headerToken = req.header('x-token');
    if (!headerToken) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }
    try {
      const decodedToken = jwt.verify(headerToken, process.env.PRIVATE_KEY);
      req.user = decodedToken;
      return next();
    } catch (err) {
      res.status(400).json({
        success: false,
        message: 'Invalid token provided.'
      });
    }
  }
}

export default Token;
