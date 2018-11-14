import dotenv from 'dotenv';

dotenv.config();

/**
 * @class { role validation class}
 */
class RoleValidation {
  /**
     *
     * @param { object } req
     * @param { object } res
     * @param { function } next on success
     * @returns { json } Json response on error
     */
  static validateSuperUserRole(req, res, next) {
    /**
  * https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  */
    const emailFilter = /^([a-zA-Z0-9_\s.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;

    let email = process.env.SUPER_USER_EMAIL;
    let password = process.env.SUPER_USER_PASSWORD;
    let username = process.env.SUPER_USERNAME;

    const errors = {};
    if (email) email = email.trim();
    const requiredField = ['SUPER_USERNAME', 'SUPER_USER_PASSWORD', 'SUPER_USER_EMAIL'];
    let pass = true;

    for (let i = 0; i < requiredField.length; i += 1) {
      if (!process.env[requiredField[i]]) {
        errors[requiredField[i]] = `${requiredField[i]} is required`;
        pass = false;
      }
    }

    const checkPassword = (str) => {
      const check = /(?=.*\d)(?=.*[a-z]).{8,}/;
      return check.test(str);
    };
    const checkUsername = (str) => {
      const check = /^[a-zA-Z0-9]+$/;
      return check.test(str);
    };

    if (email && !emailFilter.test(String(email).toLowerCase())) {
      errors.email = 'Invalid email';
      pass = false;
    }

    if (password && !checkPassword(password.toString())) {
      const mes1 = 'Password must be at least 8 characters long and';
      const mes2 = 'must be a combination of characters and numbers';
      errors.password = `${mes1} ${mes2}`;
      pass = false;
    }

    if (username && !checkUsername(username.toString())) {
      errors.username = 'Username is invalid, use only aphanumeric characters';
      pass = false;
    }

    if (pass === false) {
      return res.status(400).json({
        error: errors
      });
    }

    username = process.env.SUPER_USERNAME.toString().trim();
    password = process.env.SUPER_USER_PASSWORD.toString().trim();
    email = process.env.SUPER_USER_EMAIL.trim().toLowerCase();
    next();
  }

  /**
 *
 * @param { object } req
 * @param { object } res
 * @param { function } next on success
 * @returns { json } Json response on error
 */
  static validateAssignAdmin(req, res, next) {
    const { username } = req.body;

    const checkUsername = (str) => {
      const check = /^[a-zA-Z0-9]+$/;
      return check.test(str);
    };
    if (!username || username.toString().trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'username is required'
      });
    }

    if (!checkUsername(username)) {
      return res.status(400).json({
        success: false,
        message: 'Username is invalid, user only aphanumeric characters'
      });
    }
    next();
  }
}

export default RoleValidation;
