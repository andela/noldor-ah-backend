import express from 'express';
import ArticleController from '../../controllers/ArticleController';
import tokenMiddleware from '../../middlewares/token';
import articlesValidation from '../../helpers/validationHelpers/articleValidation';

const authorization = tokenMiddleware.validateToken;

const router = express.Router();

router.get('/api/articles', ArticleController.getAll);
router.get('/api/users/:userId/articles', ArticleController.getUserArticles);
router.get('/api/articles/users/articles/drafts', ArticleController.userDrafts);
router.get('/api/articles/:slug', ArticleController.getAnArticle);
router.post('/api/articles', articlesValidation.postArticle, ArticleController.postArticle);
router.put('/api/articles/:slug/publish', ArticleController.publishArticle);
router.put('/api/articles/:slug', ArticleController.updateArticle);
router.delete('/api/articles/:slug', ArticleController.deleteArticle);


export default router;
