import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
 *@class{Token}
 *@description{ validate user token }
 */
class Token {
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
      jwt.verify(headerToken, process.env.PRIVATE_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: 'invalid token',
            expiredAt: err.expiredAt,
          });
        }
        if (!err) {
          req.user = decoded;
          return next();
        }
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: 'Invalid token provided.'
      });
    }
  }
}

export default Token;
