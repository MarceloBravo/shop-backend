import { Router } from 'express';
import GetByIdMenuTiendaController from '../controllers/menuTienda/GetByIdMenuTiendaController.js';
import GetAllMenuTiendaController from '../controllers/menuTienda/GetAllMenuTiendaController.js';
import GetPageMenuTiendaController from '../controllers/menuTienda/GetPageMenuTiendaController.js';
import GetByIdMenuTiendaWithDeletedController from '../controllers/menuTienda/GetByIdMenuTiendaWithDeletedController.js';
import GetAllMenuTiendaWithDeletedController from '../controllers/menuTienda/GetAllMenuTiendaWithDeletedController.js';
import GetPageMenuTiendaWithDeletedController from '../controllers/menuTienda/GetPageMenuTiendaWithDeletedController.js';
import CreateMenuTiendaController from '../controllers/menuTienda/CreateMenuTiendaController.js';
import UpdateMenuTiendaController from '../controllers/menuTienda/UpdateMenuTiendaController.js';
import HardDeleteMenuTiendaController from '../controllers/menuTienda/HardDeleteMenuTiendaController.js';
import SoftDeleteMenuTiendaController from '../controllers/menuTienda/SoftDeleteMenuTiendaController.js';
import MenuTiendaRepository from '../repositories/MenuTiendaRepository.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();
const repository = new MenuTiendaRepository();

const getByIdMenuTiendaController = new GetByIdMenuTiendaController(repository);
const getAllMenuTiendaController = new GetAllMenuTiendaController(repository);
const getPageMenuTiendaController = new GetPageMenuTiendaController(repository);
const getByIdMenuTiendaWithDeletedController = new GetByIdMenuTiendaWithDeletedController(repository);
const getAllMenuTiendaWithDeletedController = new GetAllMenuTiendaWithDeletedController(repository);
const getPageMenuTiendaWithDeletedController = new GetPageMenuTiendaWithDeletedController(repository);
const createMenuTiendaController = new CreateMenuTiendaController(repository);
const updateMenuTiendaController = new UpdateMenuTiendaController(repository);
const hardDeleteMenuTiendaController = new HardDeleteMenuTiendaController(repository);
const softDeleteMenuTiendaController = new SoftDeleteMenuTiendaController(repository);

router.get('/deleted', checkToken, getAllMenuTiendaWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getByIdMenuTiendaWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageMenuTiendaWithDeletedController.execute);

router.get('/:id', getByIdMenuTiendaController.execute);
router.get('', getAllMenuTiendaController.execute);
router.get('/page/:pag/:limit?', getPageMenuTiendaController.execute);
router.post('', checkToken, createMenuTiendaController.execute);
router.put('/:id', checkToken, updateMenuTiendaController.execute);
router.delete('/:id', checkToken, hardDeleteMenuTiendaController.execute);
router.patch('/:id', checkToken, softDeleteMenuTiendaController.execute);

export default router;