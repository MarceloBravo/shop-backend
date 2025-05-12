import { Router } from 'express';
import getMenuController from '../controllers/menu/GetMenuController.js';
import getAllMenuController from '../controllers/menu/GetAllMenuController.js';
import getPageMenuController from '../controllers/menu/GetPageMenuController.js';
import createMenuController from '../controllers/menu/CreateMenuController.js';
import updateMenuController from '../controllers/menu/UpdateMenuController.js';
import deleteMenuController from '../controllers/menu/DeleteMenuController.js';
import softDeleteMenuController from '../controllers/menu/SoftDeleteMenuController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', checkToken, getMenuController);
router.get('', checkToken, getAllMenuController);
router.get('/page/:pag/:limit?', checkToken, getPageMenuController);
router.post('', checkToken, createMenuController);
router.put('/:id', checkToken, updateMenuController);
router.delete('/:id', checkToken, deleteMenuController);
router.delete('/borrar/:id', checkToken, softDeleteMenuController);

export default router;