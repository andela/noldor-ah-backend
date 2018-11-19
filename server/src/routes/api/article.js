import express from 'express';
import ArticleController from '../../controllers/ArticleController';
import ReactionController from '../../controllers/ReactionController';
import Paginator from '../../controllers/paginationController';
import Validators from '../../middlewares/validators';

const {
  allArticles, userArticles, userDrafts,
  getAnArticle, postArticle, publishArticle,
  updateArticle, deleteArticle, updateTags, rateArticles
} = ArticleController;

const { token: authorization, tags: tagsValidation } = Validators;
const router = express.Router();

router.get('/articles', allArticles);
router.get('/users/articles', authorization, userArticles);
router.get('/articles/drafts', authorization, userDrafts);
router.get('/articles/:slug', getAnArticle);

router.post('/articles', authorization, tagsValidation, postArticle);
router.put('/articles/:slug/publish', authorization, publishArticle);
router.put('/articles/:slug', authorization, updateArticle);
router.delete('/articles/:slug', authorization, deleteArticle);
router.get('/articles/page/:source', Paginator.page);
router.put('/articles/:slug/tags', authorization, tagsValidation, updateTags);
router.post('/articles/:slug/likes', authorization, ReactionController.likeArticle);

// Articles rating endpoints ---------------------
router.post('/articles/ratings/:articleId', authorization, rateArticles);

export default router;
