import express from 'express';
import LikeCommentsController from '../../controllers/LikeCommentController';
import ValidateParams from '../../middlewares/reqParams';
import Validators from '../../middlewares/validators';

const router = express.Router();

const {
  likeOrUnlikeComment,
  likeOrUnlikeReply
} = LikeCommentsController;

const {
  commentIdChecker,
  replyIdChecker
} = ValidateParams;

const {
  token
} = Validators;

router.post('/comments/:commentId/likes', token, commentIdChecker, likeOrUnlikeComment);
router.post('/replies/:replyId/likes', token, replyIdChecker, likeOrUnlikeReply);

export default router;
