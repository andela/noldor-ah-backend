/**
 * @class{ ArticleValidation }
 * @description { validates input for articles }
 */
class ArticleValidation {
  /**
   * @description { post article validation }
   * @param { object } req
   * @param { object } res
   * @param { string } next
   * @return { string } JSON
   */
  static postValidation(req, res) {
    const values = req.body;
    const errors = {};
    const required = ['title', 'description', 'content'];
    let pass = true;

    for (let i = 0; i < required.length; i += 1) {
      if (!values[required[i]]) {
        errors[required[i]] = `${required[i]} is required`;
        pass = false;
      }
    }
    for (let i = 0; i < required.length; i += 1) {
      if (values[required[i]] === '') {
        errors[required[i]] = `${required[i]} can not be an empty field`;
        pass = false;
      }
    }
    if (pass === false) {
      return res.status(400).json({
        error: errors
      });
    }
    return null;
  }

  /**
 *
 * @param {object} req
 * @param {object} res
 * @param {string} next
 * @return { object } JSON
 */
  static tagsValidation(req, res, next) {
    // from stackoverflow
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
  }
}


export default ArticleValidation;
