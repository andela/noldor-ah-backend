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

router.post('/articles/:slug/bookmarks', authorization, addBookmark);
router.get('/users/articles/bookmarks', authorization, getBookmark);
router.delete('/articles/:slug/bookmarks', authorization, removeBookmark);

export default router;
