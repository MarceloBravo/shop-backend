import { Router } from 'express';
import GetByIdRolPermisosController from '../controllers/RolPermisos/GetByIdRolPermisosController.js';
import GetByIdRolPermisosWithDeletedController from '../controllers/RolPermisos/GetByIdRolPermisosWithDeletedController.js';
import GetAllRolPermisosController from '../controllers/RolPermisos/GetAllRolPermisosController.js';
import GetAllRolPermisosWithDeletedController from '../controllers/RolPermisos/GetAllRolPermisosWithDeletedController.js';
import GetPageRolPermisosController from '../controllers/RolPermisos/GetPageRolPermisosController.js';
import GetPageRolPermisosWithDeletedController from '../controllers/RolPermisos/GetPageRolPermisosWithDeletedController.js';
import CreateRolPermisosController from '../controllers/RolPermisos/CreateRolPermisosController.js';
import UpdateRolPermisosController from '../controllers/RolPermisos/UpdateRolPermisosController.js';
import HardDeleteRolPermisosController from '../controllers/RolPermisos/HardDeleteRolPermisosController.js';
import SoftDeleteRolPermisosController from '../controllers/RolPermisos/SoftDeleteRolPermisosController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

// Instanciar los controladores
const getByIdRolPermisosController = new GetByIdRolPermisosController();
const getByIdRolPermisosWithDeletedController = new GetByIdRolPermisosWithDeletedController();
const getAllRolPermisosController = new GetAllRolPermisosController();
const getAllRolPermisosWithDeletedController = new GetAllRolPermisosWithDeletedController();
const getPageRolPermisosController = new GetPageRolPermisosController();
const getPageRolPermisosWithDeletedController = new GetPageRolPermisosWithDeletedController();
const createRolPermisosController = new CreateRolPermisosController();
const updateRolPermisosController = new UpdateRolPermisosController();
const hardDeleteRolPermisosController = new HardDeleteRolPermisosController();
const softDeleteRolPermisosController = new SoftDeleteRolPermisosController();

// Definir las rutas
router.get('/deleted', checkToken, getAllRolPermisosWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getByIdRolPermisosWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageRolPermisosWithDeletedController.execute);

router.get('/:id', checkToken, getByIdRolPermisosController.execute);
router.get('', checkToken, getAllRolPermisosController.execute);
router.get('/page/:pag/:limit?', checkToken, getPageRolPermisosController.execute);
router.post('', checkToken, createRolPermisosController.execute);
router.put('/:id', checkToken, updateRolPermisosController.execute);
router.delete('/:id', checkToken, hardDeleteRolPermisosController.execute);
router.patch('/:id', checkToken, softDeleteRolPermisosController.execute);

export default router;