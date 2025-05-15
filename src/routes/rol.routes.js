import { Router } from 'express';
import CreateRolController from '../controllers/Rol/CreateRolController.js';
import GetOneRolController from '../controllers/Rol/GetOneRolController.js';
import GetOneRolWithDeletedController from '../controllers/Rol/GetOneRolWithDeletedController.js';
import GetAllRolController from '../controllers/Rol/GetAllRolController.js';
import GetAllRolWithDeletedController from '../controllers/Rol/GetAllRolWithDeletedController.js';
import GetPageRolController from '../controllers/Rol/GetPageRolController.js';
import GetPageRolWithDeletedController from '../controllers/Rol/GetPageRolWithDeletedController.js';
import UpdateRolController from '../controllers/Rol/UpdateRolController.js';
import HardDeleteRolController from '../controllers/Rol/HardDeleteRolController.js';
import SoftDeleteRolController from '../controllers/Rol/SoftDeleteRolController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();
// Instanciar los controladores
const createRolController = new CreateRolController();
const getByIdRolController = new GetOneRolController();
const getByIdRolWithDeletedController = new GetOneRolWithDeletedController();
const getAllRolController = new GetAllRolController();
const getAllRolWithDeletedController = new GetAllRolWithDeletedController();
const getPageRolController = new GetPageRolController();
const getPageRolWithDeletedController = new GetPageRolWithDeletedController();
const updateRolController = new UpdateRolController();
const hardDeleteRolController = new HardDeleteRolController();
const softDeleteRolController = new SoftDeleteRolController();

// Definir las rutas
router.get('/deleted', checkToken, getAllRolWithDeletedController.getAll);
router.get('/deleted/:id', checkToken, getByIdRolWithDeletedController.getById);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageRolWithDeletedController.getPage);
router.post('/', checkToken, createRolController.create);
router.get('/:id', checkToken, getByIdRolController.getById);
router.get('/', checkToken, getAllRolController.getAll);
router.get('/page/:pag/:limit?', checkToken, getPageRolController.getPage);
router.put('/:id', checkToken, updateRolController.update);
router.delete('/:id', checkToken, hardDeleteRolController.hardDelete);
router.patch('/:id', checkToken, softDeleteRolController.softDelete);

export default router;