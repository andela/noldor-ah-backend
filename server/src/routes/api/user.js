import express from 'express';
import validate from '../../middlewares/validation';

const router = express.Router();

router.get('/user', (req, res) => {
  res.status(200).json({
    message: 'This is the GET user route'
  });
});

router.put('/user', (req, res) => {
  res.status(200).json({
    message: 'This is the PUT user route'
  });
});

router.post('/users/login', (req, res) => {
  res.status(200).json({
    message: 'This is the POST user login route'
  });
});

router.post('/users', validate, (req, res) => {
  res.status(200).json({
    message: 'This is the POST signup user route'
  });
});

export default router;
