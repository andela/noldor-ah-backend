
import express from 'express';
import user from './user';
import route from './article';


const router = express.Router();

router.use('/api/v1', user);
router.use('/api/v1', route);

// Home route
router.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to Author Haven</h1>');
});

export default router;
