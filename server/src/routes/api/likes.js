import express from 'express';
import LikeCommentsController from '../../controllers/LikeCommentController';
import ValidateParams from '../../middlewares/reqParams';
import Validators from '../../middlewares/validators';
import EmailVerification from '../../workers/VerificationWorker';

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

const { isVerified } = EmailVerification;

router.post('/comments/:commentId/likes', token, isVerified, commentIdChecker, likeOrUnlikeComment);
router.post('/replies/:replyId/likes', token, isVerified, replyIdChecker, likeOrUnlikeReply);

export default router;
