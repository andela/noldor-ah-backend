/* eslint-disable max-len */
import express from 'express';
import ValidateParams from '../../middlewares/reqParams';
import replyValidation from '../../middlewares/articleValidations/validReply';
import Validators from '../../middlewares/validators';
import ReplyController from '../../controllers/ReplyController';

const {
  createReply,
  getAllReplies,
  updateReply,
  deleteReply
} = ReplyController;

const {
  commentIdChecker,
  replyIdChecker
} = ValidateParams;

const {
  token
} = Validators;

const router = express.Router();

router.post('/comments/:commentId/replies', token, commentIdChecker, replyValidation, createReply);
router.get('/comments/:commentId/replies', commentIdChecker, getAllReplies);
router.put('/comments/:commentId/replies/:replyId', token, commentIdChecker, replyIdChecker, replyValidation, updateReply);
router.delete('/comments/:commentId/replies/:replyId', token, commentIdChecker, replyIdChecker, deleteReply);

export default router;
