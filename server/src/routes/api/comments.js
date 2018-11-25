import express from 'express';
import CommentController from '../../controllers/CommentsController';
import commentValidation from '../../middlewares/articleValidations/comment';
import Validators from '../../middlewares/validators';
import ValidateParams from '../../middlewares/reqParams';
import ReportController from '../../controllers/ReportController';

const {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} = CommentController;

const {
  reportComment,
  resolveCommentIssues,
  editReportedComment,
  getCommentReports,
} = ReportController;

const {
  commentIdChecker,
  articleIdChecker
} = ValidateParams;

const {
  token,
  authorizeRole,
  decisionValidator,
  acceptedCommentValidator,
  statusValidator,
} = Validators;

const router = express.Router();

router.get('/articles/:articleId/comments', articleIdChecker, getComments);
router.post('/articles/:articleId/comments', token, commentValidation, articleIdChecker,
  createComment);
router.put('/articles/:articleId/comments/:commentId', token, articleIdChecker, commentIdChecker,
  commentValidation, updateComment);
router.delete('/articles/:articleId/comments/:commentId', token, articleIdChecker, commentIdChecker,
  deleteComment);

router.post('/articles/:articleId/comments/:commentId/report', token, articleIdChecker, commentIdChecker, reportComment);
router.put('/articles/:articleId/comments/:commentId/resolve', authorizeRole, articleIdChecker, commentIdChecker, decisionValidator, resolveCommentIssues);
router.put('/articles/:articleId/comments/:commentId/resolve/editcomments', token, articleIdChecker, commentIdChecker, acceptedCommentValidator, editReportedComment);
router.get('/articles/comments/reports', authorizeRole, statusValidator, getCommentReports);

export default router;
