import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import httpResponse from './response';


dotenv.config();

/**
* @description { validates user token }
* @param { object } req
* @param { object } res
* @param { function } next
* @returns { object } user object on request body
*/
class Decoder {
  /**
* @description { validates user token }
* @param { object } req
* @param { object } res
* @param { function } next
* @returns { object } user object on request body
*/
  static validateToken(req, res) {
    const headerToken = req.header('x-token');
    if (!headerToken) {
      return httpResponse.badResponse(res, 401, 'Access denied. No token provided.');
    }
    try {
      jwt.verify(headerToken, process.env.PRIVATE_KEY, (err, decoded) => {
        if (err) {
          return httpResponse.badResponse(
            res,
            401,
            'Invalid token.',
            err, { expiredAt: err.expiredAt }
          );
        }
        if (!err) {
          req.user = decoded;
          return true;
        }
      });
    } catch (err) {
      httpResponse.badResponse(res, 400, 'Invalid token provided.', err);
    }
  }
}


export default Decoder;
