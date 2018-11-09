/**
 * @description { decodes the slug }
 * @param { object } req
 * @returns { string } articleId
 */
const slugDecoder = (req) => {
  const { slug } = req.params;
  const articleId = slug.split('-').pop();

  // https://stackoverflow.com/questions/388996/regex-for-javascript-to-allow-only-alphanumeric/389022#389022
  const pattern = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$');
  const id = pattern.test(articleId);

  if (articleId.length !== 12 || id !== true) {
    return null;
  }
  return articleId;
};

export default slugDecoder;
