import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Helpers from '../../helpers/index';

dotenv.config();

/**
* @description { validates user token }
* @param { object } req
* @param { object } res
* @param { function } next
* @returns { object } user object on request body
*/
const validateToken = (req, res, next) => {
  const headerToken = req.header('x-token');
  if (!headerToken) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }
  try {
    jwt.verify(headerToken, process.env.PRIVATE_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'invalid token',
          expiredAt: err.expiredAt,
        });
      }
      if (!err) {
        const userId = decoded.payload.id;
        const validId = await Helpers.uuidValidator(userId);
        if (!validId) {
          return res.status(404).json({
            success: false,
            message: 'user not found',
          });
        }
        const foundUser = await Helpers.UserHelper.checkUserExistence(userId);
        if (!foundUser) {
          return res.status(404).json({
            success: false,
            message: 'user not found',
          });
        }
        if (foundUser) {
          req.user = decoded;
          return next();
        }
      }
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid token provided.'
    });
  }
};

export default validateToken;
