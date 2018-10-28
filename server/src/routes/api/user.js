import express from 'express';
import UserController from '../../controllers/UserController';

const router = express.Router();

router.post('/users/register', UserController.register);
router.post('/users/login/', UserController.login);

export default router;
