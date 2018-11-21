import express from 'express';
import user from './user';
import article from './article';
import search from './search';
import category from './category';
import comment from './comments';
import reply from './reply';
<<<<<<< HEAD
import highlight from './highlight';
=======
>>>>>>> feat(roleAccess): create role based functionality
import bookmark from './bookmark';
import role from './role';
import admin from './admin';

const router = express.Router();

router.use('/api/v1', user);
router.use('/api/v1', article);
router.use('/api/v1', search);
router.use('/api/v1', category);
router.use('/api/v1', comment);
router.use('/api/v1', reply);
<<<<<<< HEAD
router.use('/api/v1', highlight);
=======
>>>>>>> feat(roleAccess): create role based functionality
router.use('/api/v1', bookmark);
router.use('/api/v1', role);
router.use('/api/v1', admin);

/**
 * Home route
 */
router.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to Author Haven</h1>');
});

export default router;
