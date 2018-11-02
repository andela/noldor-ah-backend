import express from 'express';
import UserController from '../../controllers/UserController';
import Validation from '../../middlewares/validation';
import Token from '../../middlewares/token';

const router = express.Router();

router.post('/users/register', Validation.signupValidation, UserController.register);
<<<<<<< HEAD
router.post('/users/login', Validation.loginValidation, UserController.login);
=======
router.post('/users/login/', Validation.loginValidation, UserController.login);
router.get('/users/:userId/profiles', UserController.viewUserProfile);
router.put('/users/:userId/profiles', Token.validateToken, UserController.editUserProfile);
router.delete('/users/:userId/profiles', Token.validateToken, UserController.deleteUser);
>>>>>>> feature(view/edit profile): enable user view/edit profile

export default router;
