/**
   *  @description { validates email input field on forget password }
   * @param { object } req
   * @param { object } res
   * @param { callback } next
   * @returns { callback } json/callback
   */
const forgotPasswordValidation = (req, res, next) => {
  /**
  * https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  */
  const emailFilter = /^([a-zA-Z0-9_\s.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
  const { email } = req.body;
  if (!req.body.email) {
    return res.status(400).json({
      success: false,
      message: 'email is required',
    });
  }
  if (typeof email !== 'string'
  || email.trim() === ''
  || emailFilter.test(email.toLocaleLowerCase()) === false) {
    return res.status(400).json({
      success: false,
      message: 'invalid email'
    });
  }
  next();
};

export default forgotPasswordValidation;
