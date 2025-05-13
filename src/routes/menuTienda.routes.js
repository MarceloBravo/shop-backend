import { Router } from 'express';
import getMenuTiendaController from '../controllers/menuTienda/GetMenuTiendaController.js';
import getAllMenuTiendaController from '../controllers/menuTienda/GetAllMenuTiendaController.js';
import getPageMenuTiendaController from '../controllers/menuTienda/GetPageMenuTiendaController.js';
import createMenuTiendaController from '../controllers/menuTienda/CreateMenuTiendaController.js';
import updateMenuTiendaController from '../controllers/menuTienda/UpdateMenuTiendaController.js';
import deleteMenuTiendaController from '../controllers/menuTienda/DeleteMenuTiendaController.js';
import softDeleteMenuTiendaController from '../controllers/menuTienda/SoftDeleteMenuTiendaController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', getMenuTiendaController);
router.get('', getAllMenuTiendaController);
router.get('/page/:pag/:limit?', getPageMenuTiendaController);
router.post('', checkToken, createMenuTiendaController);
router.put('/:id', checkToken, updateMenuTiendaController);
router.delete('/:id', checkToken, deleteMenuTiendaController);
router.delete('/borrar/:id', checkToken, softDeleteMenuTiendaController);

export default router;