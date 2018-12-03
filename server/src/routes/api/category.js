import express from 'express';
import getArticles from '../../controllers/CategoryController';

const router = express.Router();

router.get('/categories/:category/articles', getArticles);

export default router;
