
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns { JSON /function } json/function
 */

const acceptedCommentValidator = (req, res, next) => {
  const { acceptedComment } = req.body;

  if (!acceptedComment) {
    return res.status(400).json({
      success: false,
      message: 'acceptedComment is required',
    });
  }
  if (typeof acceptedComment !== 'string' || acceptedComment.toString().trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'acceptedComment must be a string and cannot be empty'
    });
  }
  return next();
};

export default acceptedCommentValidator;
