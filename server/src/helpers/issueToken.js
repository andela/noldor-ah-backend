import jwt from 'jsonwebtoken';
/**
 * @description { Issues token to users }
 * @param { object } payload
 * @param { object } expiresIn
 * @returns { string } token
 */
const issueToken = (payload, expiresIn = '1w') => {
  const token = jwt.sign({
    payload,
  }, process.env.PRIVATE_KEY, {
    expiresIn,
  });
  return token;
};

export default issueToken;
