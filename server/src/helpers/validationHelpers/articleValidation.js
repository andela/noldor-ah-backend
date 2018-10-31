// from stackoverflow
const trimWhiteSpaces = (input) => {
  const trimedString = input.replace(/^\s+|\s+$/g, '');
  return trimedString.length;
};
const postArticle = (req, res, next) => {
  const error = [];

  if (req.body.title === undefined) {
    error.push('title is a required field');
  }
  if (req.body.title === '') {
    error.push('title field can not be blank');
  }
  if (req.body.title !== '' && trimWhiteSpaces(req.body.title) < 6) {
    error.push('title must be more than 6 characters');
  }
  if (req.body.content === undefined) {
    error.push('content is a required field');
  }
  if (req.body.content === '') {
    error.push('content field can not be blank');
  }
  if (req.body.content !== '' && trimWhiteSpaces(req.body.content) < 6) {
    error.push('content must be more than 6 characters');
  }
  if (req.body.description === undefined) {
    error.push('description is a required field');
  }
  if (req.body.description === '') {
    error.push('description field can not be blank');
  }
  if (req.body.description !== '' && trimWhiteSpaces(req.body.description) < 6) {
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

// const checkParams(req){
//     const error = []
//     if(req.params.slug)
// }


export default {
  postArticle
};
