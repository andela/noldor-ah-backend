// from stackoverflow
const trimWhiteSpaces = input => input.trim().length;
const hasSpecialCharacters = input => /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(input);

const postArticle = (req, res, next) => {
  const error = [];

  if (req.body.title === undefined) {
    error.push('title is a required field');
  }
  if (req.body.title === '') {
    error.push('title field can not be blank');
  }
  if (req.body.title !== undefined && req.body.title !== '' && trimWhiteSpaces(req.body.title) < 6) {
    error.push('title must be more than 6 characters');
  }
  if (req.body.content === undefined) {
    error.push('content is a required field');
  }
  if (req.body.content === '') {
    error.push('content field can not be blank');
  }
  if (req.body.content !== undefined && req.body.content !== '' && trimWhiteSpaces(req.body.content) < 6) {
    error.push('content must be more than 6 characters');
  }
  if (req.body.description === undefined) {
    error.push('description is a required field');
  }
  if (req.body.description === '') {
    error.push('description field can not be blank');
  }
  if (req.body.description !== undefined && req.body.description !== '' && trimWhiteSpaces(req.body.description) < 6) {
    error.push('description must be more than 6 characters');
  }

  if (error.length > 0) {
    res.status(400).json({
      errors: error
    });
  } else {
    next();
  }
};

const tagsValidation = (req, res, next) => {
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

export default {
  postArticle,
  tagsValidation,
};
