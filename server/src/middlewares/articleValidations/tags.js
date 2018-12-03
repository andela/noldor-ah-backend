const tagsValidation = (req, res, next) => {
  const trimWhiteSpaces = input => input.trim().length;
  const hasSpecialCharacters = input => /[ !@#$%^&*()_+=[\]{};':"\\|,.<>/?]/.test(input);
  const error = [];

  if (req.body.tags) {
    if (trimWhiteSpaces(req.body.tags) < 3 || req.body.tags.length < 3) {
      error.push('at least one tag of more than 3 letters is required');
    } else {
      req.body.tags = req.body.tags.replace(/\s/g, '').split(',');

      if (req.body.tags.length > 5) {
        error.push('you can only add up to 5 tags');
      }

      req.body.tags.forEach((tag) => {
        if (Number(tag)) {
          error.push('a tag cannot consist of numbers alone');
        }
        if (hasSpecialCharacters(tag)) {
          error.push('a tag must not contain any special characters');
        }
      });
    }
  }

  if (error.length > 0) {
    return res.status(400).json({
      errors: error
    });
  }
  next();
};

export default tagsValidation;
