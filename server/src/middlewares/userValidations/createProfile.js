/**
  * @param { object } req
  * @param { object } res
  * @param { object } next
  * @returns { object } Json
  */
const createProfileValidation = (req, res, next) => {
  /**
  * @description login validation
  * Loop through all the required fields, and check for missing fields values
  * @param {string} value - value of each field
  * @param {string} required - array of required fields
  * @param {object} error - object holding all keys and their error messages
  * @var {boolean} pass - check if value meets the minimum requirement
  */
  const values = req.body;
  const required = ['firstName', 'lastName'];
  const errors = {};
  let pass = true;
  for (let i = 0; i < required.length; i += 1) {
    if (!values[required[i]]) {
      errors[required[i]] = `${required[i]} is required`;
      pass = false;
    }
  }
  /**
  * Check to see that first name is not blanck
  * @param {string} firstName - User's full name {ajima chukwuemeka}
  */
  if (values.firstName && !(/^[A-Za-z]+$/).test(values.firstName)) {
    errors.firstName = 'Invalid first name, should contain only alphabets';
    pass = false;
  }
  /**
  * Check to see that last name is not blanck
  * @param {string} lastName - User's full name {ajima chukwuemeka}
  */
  if (values.lastName && !(/^[A-Za-z]+$/).test(values.lastName)) {
    errors.lastName = 'Invalid last name, should contain only alphabets';
    pass = false;
  }
  /**
  * Check to see that first name is not blanck
  * @param {string} name - User's full name {ajima chukwuemeka}
  */
  if (values.firstName && !values.firstName.replace(/\s/g, '').length) {
    errors.firstName = 'First name field can not be blank';
    pass = false;
  }
  /**
  * Check to see that last name is not blanck
  * @param {string} name - User's full name {ajima chukwuemeka}
  */
  if (values.lastName && !values.lastName.replace(/\s/g, '').length) {
    errors.lastName = 'Last name field can not be blank';
    pass = false;
  }

  if (pass === false) {
    return res.status(400).json({
      error: errors
    });
  }
  req.body.firstName = req.body.firstName.trim();
  req.body.lastName = req.body.lastName.trim();
  next();
};

export default createProfileValidation;
