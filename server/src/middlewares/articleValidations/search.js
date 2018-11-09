/**
 * @description { Validate Search Requests Input }
 * @param { object } req
 * @param { object } res
 * @param { object } next
 * @returns { object } Json
 */
const searchValidation = (req, res, next) => {
  if (!req.body.keywords) {
    return res.status(400).json({
      success: false,
      error: {
        msg: 'search keyword must be provided'
      },
    });
  }
  next();
};

export default searchValidation;
