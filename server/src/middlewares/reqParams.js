import uuidCheck from '../helpers/validParams';

/**
 * @description Validation middleware, used to validate input fields
 */
class ValidateParams {
  /**
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - passes along the process another handler
   * @return {json} res.json
   */
  static articleIdChecker(req, res, next) {
    try {
      if (!uuidCheck(req.params.articleId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid article parameter'
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - passes along the process another handler
   * @return {json} res.json
   */
  static userIdChecker(req, res, next) {
    try {
      if (!uuidCheck(req.params.userId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user parameter'
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - passes along the process another handler
   * @return {json} res.json
   */
  static commentIdChecker(req, res, next) {
    try {
      if (!uuidCheck(req.params.commentId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid comment parameter'
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - passes along the process another handler
   * @return {json} res.json
   */
  static replyIdChecker(req, res, next) {
    try {
      if (!uuidCheck(req.params.replyId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid reply parameter'
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

export default ValidateParams;
