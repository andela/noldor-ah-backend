import jwt from 'jsonwebtoken';
import Helpers from '../../helpers/index';

const authorizeRole = (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }

  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'invalid token',
        expiredAt: err.expiredAt,
      });
    }

    const user = decoded.payload;
    const role = Helpers.roleDefinition;
    if (user.role < role.admin) {
      return res.status(401).json({
        success: false,
        message: 'you cannot perform this operation',
      });
    }
    req.currentUserPriviledge = user.role;
    return next();
  });
};

export default authorizeRole;
