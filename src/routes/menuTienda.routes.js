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
import { checkToken } from '../shared/mw_token.js';

const router = Router();

const getByIdMenuTiendaController = new GetByIdMenuTiendaController();
const getAllMenuTiendaController = new GetAllMenuTiendaController();
const getPageMenuTiendaController = new GetPageMenuTiendaController();
const getByIdMenuTiendaWithDeletedController = new GetByIdMenuTiendaWithDeletedController();
const getAllMenuTiendaWithDeletedController = new GetAllMenuTiendaWithDeletedController();
const getPageMenuTiendaWithDeletedController = new GetPageMenuTiendaWithDeletedController();
const createMenuTiendaController = new CreateMenuTiendaController();
const updateMenuTiendaController = new UpdateMenuTiendaController();
const hardDeleteMenuTiendaController = new HardDeleteMenuTiendaController();
const softDeleteMenuTiendaController = new SoftDeleteMenuTiendaController();

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