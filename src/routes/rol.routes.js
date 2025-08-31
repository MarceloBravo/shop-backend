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
import RolRepository from '../repositories/RolRepository.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();
const repository = new RolRepository();

// Instanciar los controladores
const createRolController = new CreateRolController(repository);
const getByIdRolController = new GetByIdRolController(repository);
const getByIdRolWithDeletedController = new GetByIdRolWithDeletedController(repository);
const getAllRolController = new GetAllRolController(repository);
const getAllRolWithDeletedController = new GetAllRolWithDeletedController(repository);
const getPageRolController = new GetPageRolController(repository);
const getPageRolWithDeletedController = new GetPageRolWithDeletedController(repository);
const updateRolController = new UpdateRolController(repository);
const hardDeleteRolController = new HardDeleteRolController(repository);
const softDeleteRolController = new SoftDeleteRolController(repository);

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