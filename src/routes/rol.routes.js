import { Router } from 'express';
import CreateRolController from '../controllers/Rol/CreateRolController.js';
import GetRolController from '../controllers/Rol/GetRolController.js';
import GetAllRolController from '../controllers/Rol/GetAllRolController.js';
import GetPageRolController from '../controllers/Rol/GetPageRolController.js';
import UpdateRolController from '../controllers/Rol/UpdateRolController.js';
import DeleteRolController from '../controllers/Rol/DeleteRolController.js';
import SoftDeleteRolController from '../controllers/Rol/SoftDeleteRolController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();
// Instanciar los controladores
const createRolController = new CreateRolController();
const getRolController = new GetRolController();
const getAllRolController = new GetAllRolController();
const getPageRolController = new GetPageRolController();
const updateRolController = new UpdateRolController();
const deleteRolController = new DeleteRolController();
const softDeleteRolController = new SoftDeleteRolController();

// Definir las rutas
router.post('/', checkToken, createRolController.createRol);
router.get('/:id', checkToken, getRolController.getRol);
router.get('/', checkToken, getAllRolController.getAllRol);
router.get('/page/:pag/:limit?', checkToken, getPageRolController.getPageRol);
router.put('/:id', checkToken, updateRolController.updateRol);
router.delete('/:id', checkToken, deleteRolController.deleteRol);
router.patch('/:id', checkToken, softDeleteRolController.softDeleteRol);

export default router;