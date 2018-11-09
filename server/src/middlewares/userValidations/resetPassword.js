/**
 * @description { validate password fields }
 * @param { object } req
 * @param { object } res
 * @param { callback } next
 * @returns { callback } callback
 */
const resetPasswordValidation = (req, res, next) => {
  const {
    password,
    confirmPassword
  } = req.body;
  const checkPassword = (str) => {
    const check = /(?=.*\d)(?=.*[a-z]).{8,}/;
    return check.test(str);
  };

  if (!req.body.password) {
    return res.status(400).json({
      success: false,
      message: 'password field is required',
    });
  }
  if (!req.body.confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'confirmPassword field is required',
    });
  }

  if (typeof password !== 'string' || !checkPassword(password)) {
    return res.status(400).json({
      success: false,
      message: 'Password must be atleast 8 characters long and must be a combination of characters and numbers'
    });
  }

  const firstEntry = checkPassword(password) && password.toString().replace(/\s/g, '');
  const secondEntry = checkPassword(password) && confirmPassword.toString().replace(/\s/g, '');
  if (firstEntry !== secondEntry) {
    return res.status(400).json({
      success: false,
      message: 'passwords does not match',
    });
  }
  next();
};

export default resetPasswordValidation;
