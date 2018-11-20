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
    const required = ['title', 'description', 'content', 'category'];
    let pass = true;

    for (let i = 0; i < required.length; i += 1) {
      if (!values[required[i]]) {
        errors[required[i]] = `${required[i]} is required`;
        pass = false;
      }
    }
    for (let i = 0; i < required.length; i += 1) {
      if (values[required[i]] && (values[required[i]] === '' || values[required[i]].trim() < 1)) {
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
}

export default ArticleValidation;
