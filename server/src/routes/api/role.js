import express from 'express';
import RoleController from '../../controllers/RoleController';
import validators from '../../middlewares/validators';

const router = express.Router();

const {
  authorizeRole,
  validateSuperUserRole,
  validateAssignAdmin
} = validators;

const {
  assignSuperUserRole,
  assignAdmin,
  unassignAdmin,
} = RoleController;

router.post('/role/superadmin/assign', validateSuperUserRole, assignSuperUserRole);
router.put('/role/admin/assign', authorizeRole, validateAssignAdmin, assignAdmin);
router.put('/role/admin/unassign', authorizeRole, validateAssignAdmin, unassignAdmin);

export default router;
