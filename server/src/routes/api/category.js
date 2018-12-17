import express from 'express';
import getArticles, { getAllCategories } from '../../controllers/CategoryController';

const router = express.Router();
router.get('/categories', getAllCategories);
router.get('/categories/:category/articles', getArticles);

export default router;
