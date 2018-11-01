import express from 'express';
import ArticleController from '../../controllers/ArticleController';
import tokenMiddleware from '../../middlewares/token';
import articlesValidation from '../../helpers/validationHelpers/articleValidation';

const authorization = tokenMiddleware.validateToken;

const router = express.Router();

router.get('/api/articles', ArticleController.getAll);
router.get('/api/users/articles', authorization, ArticleController.getUserArticles);
router.get('/api/articles/drafts', authorization, ArticleController.userDrafts);
router.get('/api/articles/:slug', ArticleController.getAnArticle);
router.post('/api/articles', authorization, articlesValidation.postArticle, ArticleController.postArticle);
router.put('/api/articles/:slug/publish', authorization, ArticleController.publishArticle);
router.put('/api/articles/:slug', authorization, ArticleController.updateArticle);
router.delete('/api/articles/:slug', authorization, ArticleController.deleteArticle);


export default router;
