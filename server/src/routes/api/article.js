import express from 'express';

const router = express.Router();

router.get('/articles', (req, res) => {
  res.status(200).send('<h1>This is the Article Route</h1>');
});

export default router;
