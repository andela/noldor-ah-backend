/* eslint-disable max-len */
import express from 'express';
import CommentController from '../../controllers/CommentsController';
import commentValidation from '../../middlewares/articleValidations/comment';
import Validators from '../../middlewares/validators';
import ValidateParams from '../../middlewares/reqParams';

const {
  getComments,
  createComment,
  updateComment,
  deleteComment
} = CommentController;

const {
  commentIdChecker,
  articleIdChecker
} = ValidateParams;

const {
  token
} = Validators;

const router = express.Router();

router.get('/articles/:articleId/comments', articleIdChecker, getComments);
router.post('/articles/:articleId/comments', token, commentValidation, articleIdChecker, createComment);
router.put('/articles/:articleId/comments/:commentId', token, articleIdChecker, commentIdChecker, commentValidation, updateComment);
router.delete('/articles/:articleId/comments/:commentId', token, articleIdChecker, commentIdChecker, deleteComment);

export default router;
