import express from 'express';
import AdminController from '../../controllers/AdminController';
import validators from '../../middlewares/validators';

const router = express.Router();

const {
  authorizeRole,
} = validators;

const {
  takedownArticle,
  addCategory,
  deactivateUser,
  reactivateUser,
} = AdminController;

router.delete('/admin/takedown/articles/:slug', authorizeRole, takedownArticle);
router.post('/categories', authorizeRole, addCategory);
router.delete('/admin/deactivate/users/:username', authorizeRole, deactivateUser);
router.put('/admin/reactivate/users/:username', authorizeRole, reactivateUser);

export default router;
