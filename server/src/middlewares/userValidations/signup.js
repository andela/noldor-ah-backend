/**
*
* @param { object } req
* @param { object } res
* @param { object } next
* @returns { object } Json
*/
const signupValidation = (req, res, next) => {
  /**
  * https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  */
  const emailFilter = /^([a-zA-Z0-9_\s.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
  if (req.body.email) req.body.email = req.body.email.trim();
  const values = req.body;
  const required = ['username', 'email', 'password', 'confirmPassword'];
  const errors = {};
  let pass = true;
  /**
  * Loop through all the required fields, and check for missing fields values
  * @param {string} value - value of each field
  * @param {string} required - array of required fields
  * @param {object} error - object holding all keys and their error messages
  * @var {boolean} pass - check if value meets the minimum requirement
  */
  for (let i = 0; i < required.length; i += 1) {
    if (!values[required[i]]) {
      errors[required[i]] = `${required[i]} is required`;
      pass = false;
    }
  }
  /**
  * Check if password has atleast a string, number and is upto 8 characters long
  * @param {string} str - parameter for email arguments
  * @returns {string} boolean (true or false) if it meets the requirement or false if otherwise
  */
  const checkPassword = (str) => {
    const check = /(?=.*\d)(?=.*[a-z]).{8,}/;
    return check.test(str);
  };
  const checkUsername = (str) => {
    const check = /^[a-zA-Z0-9]+$/;
    return check.test(str);
  };
  /**
  * Check to see that username is not blanck
  * @param {string} username - User's username {meeky}
  */
  if (values.username && !values.username.replace(/\s/g, '').length) {
    errors.username = 'Username field can not be blank';
    pass = false;
  }
  if (values.username && !checkUsername(values.username.toString())) {
    errors.username = 'Username is invalid, user only aphanumeric characters';
    return false;
  }
  /**
  * Check to see that email is not blanck
  * @param {string} email - User's email {meeky.ae@gmail.com}
  */
  if (values.email && !values.email.replace(/\s/g, '').length) {
    errors.email = 'Email field can not be blank';
    pass = false;
  }

  /**
  * Check to see that email format is correct
  * @param {string} email - User's email {meeky.ae@gmail.com}
  */
  if (values.email && !emailFilter.test(String(values.email).toLowerCase())) {
    errors.email = 'Invalid email';
    pass = false;
  }

  /**
  * Check to see that password is not blanck
  * @param {string} password - User's password {x456As49#u4me}
  */
  if (values.password && !values.password.toString().replace(/\s/g, '').length) {
    errors.password = 'Password field can not be blank';
    pass = false;
  }

  /**
  * Check if password has atleast a string, number and is upto 8 characters long
  * @param {string} password - User's password {x456As49#u4me}
  */
  if (values.password && !checkPassword(values.password.toString())) {
    const mes1 = 'Password must be at least 8 characters long and';
    const mes2 = 'must be a combination of characters and numbers';
    errors.password = `${mes1} ${mes2}`;
    pass = false;
  }

  /**
  * Check if password is properly confirmed
  * @param {string} confirmPassword - User's password {x456As49#u4me}
  */
  if (values.confirmPassword && !values.confirmPassword.toString().replace(/\s/g, '').length) {
    errors.confirmPassword = 'Confirm Password field can not be blank';
    pass = false;
  }
  /**
  * Get the values of password and confirm pass and check their equality
  * @param {string} passOne- password
  * @param {string} passTwo - conifrmPassword
  */
  const passOne = values.confirmPassword && values.confirmPassword.toString().replace(/\s/g, '');
  const passTwo = values.password && values.password.toString().replace(/\s/g, '');
  if (passOne !== passTwo) {
    errors.matchPass = 'Passwords did not match, please try again';
    pass = false;
  }
  /**
  * Check if any validation failed, if yes display error(s) else continue
  */
  if (pass === false) {
    return res.status(400).json({
      error: errors
    });
  }
  req.body.username = req.body.username.toString().trim();
  req.body.password = req.body.password.toString().trim();
  req.body.email = req.body.email.trim().toLowerCase();
  next();
};

export default signupValidation;
