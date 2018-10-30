import express from 'express';
import UserController from '../../controllers/UserController';
import Validation from '../../middlewares/validation';

const router = express.Router();

router.post('/users/register', Validation.signupValidation, UserController.register);
router.post('/users/login/', Validation.loginValidation, UserController.login);

export default router;
