import express from 'express';
import ReadingStatsController from '../../controllers/ReadingStatsController';
import Validators from '../../middlewares/validators';
import EmailVerification from '../../workers/VerificationWorker';

const { isVerified } = EmailVerification;
const { token: authorization } = Validators;
const { getReadingStatistics } = ReadingStatsController;

const router = express.Router();

router.get('/users/:userId/stats', authorization, isVerified, getReadingStatistics);

export default router;
