import issueToken from '../helpers/issueToken';

/**
 * @class { Social media controller that returns a token to the user }
 * @description { Handles Users Social media login}
 */
class SocialMedia {
  /**
   * @param { object } req
   * @param { object } res
   * @returns { object } Json
   */
  static facebook(req, res) {
    const { user } = req;
    const token = issueToken(user);
    res.header('x-token', token);
    return res.status(200).json({
      success: true,
      message: 'Facebook login successful',
      data: {
        user,
        token
      }
    });
  }

  /**
   * @param { object } req
   * @param { object } res
   * @returns { object } Json
   */
  static google(req, res) {
    const { user } = req;
    const token = issueToken(user);
    res.header('x-token', token);
    return res.status(200).json({
      success: true,
      message: 'Google login successful',
      data: {
        user,
        token
      }
    });
  }
}

export default SocialMedia;
