import express from 'express';
import ArticleController from '../../controllers/ArticleController';
import ReactionController from '../../controllers/ReactionController';
import Paginator from '../../controllers/paginationController';
import Validators from '../../middlewares/validators';
import ReportController from '../../controllers/ReportController';
import EmailVerification from '../../workers/VerificationWorker';

const {
  allArticles, userArticles, userDrafts,
  getAnArticle, postArticle, publishArticle,
  updateArticle, deleteArticle, rateArticles
} = ArticleController;

const { token: authorization, tags: tagsValidation } = Validators;
const {
  getAllReports, reportArticle, reviewReport
} = ReportController;

const router = express.Router();
const { isVerified } = EmailVerification;

router.get('/articles', allArticles);
router.get('/users/articles', authorization, userArticles);
router.get('/articles/drafts', authorization, userDrafts);
router.get('/articles/:slug', getAnArticle);

router.post('/articles', authorization, isVerified, tagsValidation, postArticle);
router.put('/articles/:slug/publish', authorization, isVerified, publishArticle);
router.put('/articles/:slug', authorization, isVerified, tagsValidation, updateArticle);
router.delete('/articles/:slug', authorization, isVerified, deleteArticle);
router.get('/articles/page/:source', Paginator.page);
router.post('/articles/:slug/likes', authorization, isVerified, ReactionController.likeArticle);
router.post('/articles/ratings/:articleId', authorization, isVerified, rateArticles);


const {
  token
} = Validators;

// Article report endpoints ----------------------
router.post('/articles/:slug/report', token, isVerified, reportArticle);
router.get('/reports', token, getAllReports);
router.put('/reports/:reportId/resolve', token, isVerified, reviewReport);

export default router;
