import express from 'express';
import ArticleController from '../../controllers/ArticleController';
import ReactionController from '../../controllers/ReactionController';
import Paginator from '../../controllers/paginationController';
import Validators from '../../middlewares/validators';

const {
  allArticles, userArticles, userDrafts,
  getAnArticle, postArticle, publishArticle,
  updateArticle, deleteArticle, updateTags
} = ArticleController;
const router = express.Router();

router.get('/articles', allArticles);
router.get('/users/articles', Validators.token, userArticles);
router.get('/articles/drafts', Validators.token, userDrafts);
router.get('/articles/:slug', getAnArticle);
router.post('/articles', Validators.token, Validators.postArticle, Validators.tags, postArticle);
router.put('/articles/:slug/publish', Validators.token, publishArticle);
router.put('/articles/:slug', Validators.token, updateArticle);
router.delete('/articles/:slug', Validators.token, deleteArticle);
router.get('/articles/page/:source', Paginator.page);
router.put('/articles/:slug/tags', Validators.token, Validators.tags, updateTags);
router.put('/articles/:slug/likes', Validators.token, ReactionController.likeArticle);

export default router;
