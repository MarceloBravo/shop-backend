import { Router } from 'express';
import getRolController from '../controllers/Rol/GetRolController.js';
import getAllRolController from '../controllers/Rol/GetAllRolController.js';
import getPageRolController from '../controllers/Rol/GetPageRolController.js';
import createRolController from '../controllers/Rol/CreateRolController.js';
import updateRolController from '../controllers/Rol/UpdateRolController.js';
import deleteRolController from '../controllers/Rol/DeleteRolController.js';
import softDeleteRolController from '../controllers/Rol/SoftDeleteRolController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', getRolController);
router.get('', getAllRolController);
router.get('/page/:pag/:limit?', getPageRolController);
router.post('', checkToken, createRolController);
router.put('/:id', checkToken, updateRolController);
router.delete('/:id', checkToken, deleteRolController);
router.delete('/borrar/:id', checkToken, softDeleteRolController);

export default router;