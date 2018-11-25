import express from 'express';
import HistoryController from '../../controllers/CommentHistoryController';
import Validators from '../../middlewares/validators';
import EmailVerification from '../../workers/VerificationWorker';

const { isVerified } = EmailVerification;
const { token: authorization } = Validators;
const { getCommentHistory } = HistoryController;

const router = express.Router();

router.get('/comments/:commentId/history', authorization, isVerified, getCommentHistory);

export default router;
