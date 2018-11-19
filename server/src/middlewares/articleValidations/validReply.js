const replyValidation = (req, res, next) => {
  try {
    let validReply = req.body.reply;
    validReply = validReply.trim();

    if (typeof validReply !== 'string' || validReply === undefined || validReply === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a reply'
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

export default replyValidation;
