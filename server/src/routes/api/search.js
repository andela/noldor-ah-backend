import express from 'express';
import SearchController from '../../controllers/SearchController';
import searchValidator from '../../helpers/validationHelpers/searchValidation';

const router = express.Router();

router.post('/search', searchValidator, SearchController.search);

export default router;
