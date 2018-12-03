import express from 'express';
import SearchController from '../../controllers/SearchController';
import Validators from '../../middlewares/validators';

const router = express.Router();

router.post('/search', Validators.search, SearchController.search);

export default router;
