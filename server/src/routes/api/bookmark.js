import express from 'express';
import validators from '../../middlewares/validators';
import BookmarkController from '../../controllers/BookmarkController';

const router = express.Router();

const {
  token: authorization,
} = validators;

const {
  addBookmark,
  getBookmark,
  removeBookmark,
} = BookmarkController;

router.post('/articles/:slug/bookmark', authorization, addBookmark);
router.get('/users/articles/bookmark', authorization, getBookmark);
router.delete('/articles/:slug/bookmark', authorization, removeBookmark);

export default router;
