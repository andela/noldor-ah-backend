import express from 'express';
import ArticleController from '../../controllers/ArticleController';
import tokenMiddleware from '../../middlewares/token';
import Paginator from '../../helpers/articlePagination';
import articlesValidation from '../../helpers/validationHelpers/articleValidation';

const authorization = tokenMiddleware.validateToken;
const router = express.Router();

router.get('/articles', ArticleController.getAll);
router.get('/users/articles', authorization, ArticleController.getUserArticles);
router.get('/articles/drafts', authorization, ArticleController.userDrafts);
router.get('/articles/:slug', ArticleController.getAnArticle);
router.post('/articles', authorization, articlesValidation.postArticle, ArticleController.postArticle);
router.put('/articles/:slug/publish', authorization, ArticleController.publishArticle);
router.put('/articles/:slug', authorization, ArticleController.updateArticle);
router.delete('/articles/:slug', authorization, ArticleController.deleteArticle);
router.get('/articles/page/:source', Paginator.page);

export default router;
