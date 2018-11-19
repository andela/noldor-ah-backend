const commentValidation = (req, res, next) => {
  try {
    let validComment = req.body.comment;
    validComment = validComment.trim();

    if (typeof validComment !== 'string' || validComment === undefined || validComment === '') {
      return res.status(400).json({
        success: false,
        message: 'Please say something...'
      });
    }
    return next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        message: error.message,
      }
    });
  }
};

export default commentValidation;
