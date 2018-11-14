
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns { JSON /function } json/function
 */

const validateDecision = (req, res, next) => {
  const { decision } = req.body;
  const acceptedDecision1 = 'blocked';
  const acceptedDecision2 = 'resolved';
  if (decision === acceptedDecision1 || decision === acceptedDecision2) {
    return next();
  }
  return res.status(400).json({
    success: false,
    message: 'decision can only be either blocked or resolved',
  });
};

export default validateDecision;
