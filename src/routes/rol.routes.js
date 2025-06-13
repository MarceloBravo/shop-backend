import { Router } from 'express';
import CreateRolController from '../controllers/Rol/CreateRolController.js';
import GetByIdRolController from '../controllers/Rol/GetByIdRolController.js';
import GetByIdRolWithDeletedController from '../controllers/Rol/GetByIdRolWithDeletedController.js';
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
const getByIdRolController = new GetByIdRolController();
const getByIdRolWithDeletedController = new GetByIdRolWithDeletedController();
const getAllRolController = new GetAllRolController();
const getAllRolWithDeletedController = new GetAllRolWithDeletedController();
const getPageRolController = new GetPageRolController();
const getPageRolWithDeletedController = new GetPageRolWithDeletedController();
const updateRolController = new UpdateRolController();
const hardDeleteRolController = new HardDeleteRolController();
const softDeleteRolController = new SoftDeleteRolController();

// Definir las rutas
router.get('/deleted', checkToken, getAllRolWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getByIdRolWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageRolWithDeletedController.execute);
router.post('/', checkToken, createRolController.execute);
router.get('/:id', checkToken, getByIdRolController.execute);
router.get('/', checkToken, getAllRolController.execute);
router.get('/page/:pag/:limit?', checkToken, getPageRolController.execute);
router.put('/:id', checkToken, updateRolController.execute);
router.delete('/:id', checkToken, hardDeleteRolController.execute);
router.patch('/:id', checkToken, softDeleteRolController.execute);

export default router;