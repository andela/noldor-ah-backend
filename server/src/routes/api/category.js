import express from 'express';
import CategoryController from '../../controllers/CategoryController';

const { getArticles } = CategoryController;
const router = express.Router();

router.get('/categories/:category/articles', getArticles);

export default router;
