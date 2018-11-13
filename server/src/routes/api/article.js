import express from 'express';
import ArticleController from '../../controllers/ArticleController';
import ReactionController from '../../controllers/ReactionController';
import tokenMiddleware from '../../middlewares/token';
import Paginator from '../../helpers/articlePagination';
import articlesValidation from '../../helpers/validationHelpers/articleValidation';

const {
  allArticles, userArticles, userDrafts,
  getAnArticle, postArticle, publishArticle,
  updateArticle, deleteArticle, updateTags
} = ArticleController;

const {
  tagsValidation,
  postValidation
} = articlesValidation;
const authorization = tokenMiddleware.validateToken;
const router = express.Router();

router.get('/articles', allArticles);
router.get('/users/articles', authorization, userArticles);
router.get('/articles/drafts', authorization, userDrafts);
router.get('/articles/:slug', getAnArticle);
router.post('/articles', authorization, postValidation, tagsValidation, postArticle);
router.put('/articles/:slug/publish', authorization, publishArticle);
router.put('/articles/:slug', authorization, updateArticle);
router.delete('/articles/:slug', authorization, deleteArticle);
router.get('/articles/page/:source', Paginator.page);
router.put('/articles/:slug/tags', authorization, articlesValidation.tagsValidation, updateTags);
router.put('/articles/:slug/likes', authorization, ReactionController.likeArticle);

export default router;
