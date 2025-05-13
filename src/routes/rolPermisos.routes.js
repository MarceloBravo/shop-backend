import { Router } from 'express';
import getRolPermisosController from '../controllers/RolPermisos/GetRolPermisosController.js';
import getAllRolPermisosController from '../controllers/RolPermisos/GetAllRolPermisosController.js';
import getPageRolPermisosController from '../controllers/RolPermisos/GetPageRolPermisosController.js';
import createRolPermisosController from '../controllers/RolPermisos/CreateRolPermisosController.js';
import updateRolPermisosController from '../controllers/RolPermisos/UpdateRolPermisosController.js';
import deleteRolPermisosController from '../controllers/RolPermisos/DeleteRolPermisosController.js';
import softDeleteRolPermisosController from '../controllers/RolPermisos/SoftDeleteRolPermisosController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', checkToken, getRolPermisosController);
router.get('', checkToken, getAllRolPermisosController);
router.get('/page/:pag/:limit?', checkToken, getPageRolPermisosController);
router.post('', checkToken, createRolPermisosController);
router.put('/:id', checkToken, updateRolPermisosController);
router.delete('/:id', checkToken, deleteRolPermisosController);
router.delete('/borrar/:id', checkToken, softDeleteRolPermisosController);

export default router;