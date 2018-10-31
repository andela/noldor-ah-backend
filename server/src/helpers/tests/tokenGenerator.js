import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const userToken = `${jwt.sign({
  id: '1'
}, process.env.PRIVATE_KEY)}`;
const userToken2 = `${jwt.sign({
  id: '1'
}, process.env.PRIVATE_KEY, {
  expiresIn: '1w',
})}`;
const wrongToken = `${jwt.sign({
  id: '1'
}, 'faketoken', {
  expiresIn: '1w',
})}`;

export default {
  userToken, userToken2, wrongToken
};
