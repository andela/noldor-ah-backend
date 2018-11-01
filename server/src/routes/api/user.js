import express from 'express';
import UserController from '../../controllers/UserController';
import Validation from '../../middlewares/validation';
import userToken from '../../middlewares/token';

const router = express.Router();

router.post('/users/register', Validation.signupValidation, UserController.register);
router.post('/users/login/', Validation.loginValidation, UserController.login);
router.get('/users/', userToken.validateToken, UserController.getAllUser);

export default router;
