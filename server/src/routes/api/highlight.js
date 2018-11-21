import express from 'express';
import HighlightController from '../../controllers/HighlightController';
import Validators from '../../middlewares/validators';

const {
  token,
  add
} = Validators;

const {
  addHighlight, removeHighlight
} = HighlightController;

const router = express.Router();

router.post('/articles/:articleId/highlights', token, add, addHighlight);
router.delete('/articles/:articleId/highlights/:highlightId', token, removeHighlight);

export default router;
