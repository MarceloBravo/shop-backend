import { Router } from 'express';
import CreateRolController from '../controllers/Rol/CreateRolController.js';
import GetOneRolController from '../controllers/Rol/GetOneRolController.js';
import GetAllRolController from '../controllers/Rol/GetAllRolController.js';
import GetPageRolController from '../controllers/Rol/GetPageRolController.js';
import UpdateRolController from '../controllers/Rol/UpdateRolController.js';
import HardDeleteRolController from '../controllers/Rol/HardDeleteRolController.js';
import SoftDeleteRolController from '../controllers/Rol/SoftDeleteRolController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();
// Instanciar los controladores
const createRolController = new CreateRolController();
const getOneRolController = new GetOneRolController();
const getAllRolController = new GetAllRolController();
const getPageRolController = new GetPageRolController();
const updateRolController = new UpdateRolController();
const hardDeleteRolController = new HardDeleteRolController();
const softDeleteRolController = new SoftDeleteRolController();

// Definir las rutas
router.post('/', checkToken, createRolController.create);
router.get('/:id', checkToken, getOneRolController.getOne);
router.get('/', checkToken, getAllRolController.getAll);
router.get('/page/:pag/:limit?', checkToken, getPageRolController.getPage);
router.put('/:id', checkToken, updateRolController.update);
router.delete('/:id', checkToken, hardDeleteRolController.hardDelete);
router.patch('/:id', checkToken, softDeleteRolController.softDelete);

export default router;