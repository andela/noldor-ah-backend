const add = (req, res, next) => {
  let message = '';
  const { highlight, comment } = req.body;

  if (!highlight) {
    message = 'highlight is a required field';
  }
  if (highlight && highlight.trim().length < 6) {
    message = 'highlight must be more than 5 characters';
  }
  if (comment && comment.trim().length < 6) {
    message = 'comment must be more than 5 characters';
  }

  if (message.length > 0) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  next();
};

export default add;
