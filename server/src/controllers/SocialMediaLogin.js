import issueToken from '../helpers/issueToken';
import httpResponse from '../helpers/response';

const {
  goodResponse
} = httpResponse;

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
    return goodResponse(res, 200, 'Facebook login successful', user, token);
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
    return goodResponse(res, 200, 'Google login successful', user, token);
  }
}

export default SocialMedia;
