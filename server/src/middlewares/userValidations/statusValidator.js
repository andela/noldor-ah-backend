
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns { JSON /function } json/function
 */

const statusValidator = (req, res, next) => {
  const { status } = req.query;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: 'search parameter of status is required',
    });
  }
  if (status === 'pending' || status === 'blocked' || status === 'resolved') {
    return next();
  }
  return res.status(400).json({
    success: false,
    message: 'status search params can only be either pending, blocked or resolved',
  });
};

export default statusValidator;
