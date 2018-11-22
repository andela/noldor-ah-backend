import express from 'express';
import user from './user';
import article from './article';
import search from './search';
import category from './category';
import comment from './comments';
import reply from './reply';
import highlight from './highlight';
import bookmark from './bookmark';
import likes from './likes';

const router = express.Router();

router.use('/api/v1', user);
router.use('/api/v1', article);
router.use('/api/v1', search);
router.use('/api/v1', category);
router.use('/api/v1', comment);
router.use('/api/v1', reply);
router.use('/api/v1', highlight);
router.use('/api/v1', bookmark);
router.use('/api/v1', likes);
/**
 * Home route
 */
router.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to Author Haven</h1>');
});

export default router;
