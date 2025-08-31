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
import RolPermisosRepository from '../repositories/RolPermisosRepository.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();
const repository = new RolPermisosRepository();

// Instanciar los controladores
const getByIdRolPermisosController = new GetByIdRolPermisosController(repository);
const getByIdRolPermisosWithDeletedController = new GetByIdRolPermisosWithDeletedController(repository);
const getAllRolPermisosController = new GetAllRolPermisosController(repository);
const getAllRolPermisosWithDeletedController = new GetAllRolPermisosWithDeletedController(repository);
const getPageRolPermisosController = new GetPageRolPermisosController(repository);
const getPageRolPermisosWithDeletedController = new GetPageRolPermisosWithDeletedController(repository);
const createRolPermisosController = new CreateRolPermisosController(repository);
const updateRolPermisosController = new UpdateRolPermisosController(repository);
const hardDeleteRolPermisosController = new HardDeleteRolPermisosController(repository);
const softDeleteRolPermisosController = new SoftDeleteRolPermisosController(repository);

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