import { Router } from 'express';
import GetByIdMenuController from '../controllers/menu/GetByIdMenuController.js';
import GetAllMenuController from '../controllers/menu/GetAllMenuController.js';
import GetPageMenuController from '../controllers/menu/GetPageMenuController.js';
import GetByIdMenuWithDeletedController from '../controllers/menu/GetByIdMenuWithDeletedController.js';
import GetAllMenuWithDeletedController from '../controllers/menu/GetAllMenuWithDeletedController.js';
import GetPageMenuWithDeletedController from '../controllers/menu/GetPageMenuWithDeletedController.js';
import CreateMenuController from '../controllers/menu/CreateMenuController.js';
import UpdateMenuController from '../controllers/menu/UpdateMenuController.js';
import HardDeleteMenuController from '../controllers/menu/HardDeleteMenuController.js';
import SoftDeleteMenuController from '../controllers/menu/SoftDeleteMenuController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

const getByIdMenuController = new GetByIdMenuController();
const getAllMenuController = new GetAllMenuController();
const getPageMenuController = new GetPageMenuController();
const getByIdMenuWithDeletedController = new GetByIdMenuWithDeletedController();
const getAllMenuWithDeletedController = new GetAllMenuWithDeletedController();
const getPageMenuWithDeletedController = new GetPageMenuWithDeletedController();
const createMenuController = new CreateMenuController();
const updateMenuController = new UpdateMenuController();
const hardDeleteMenuController = new HardDeleteMenuController();
const softDeleteMenuController = new SoftDeleteMenuController();

router.get('/deleted', checkToken, getAllMenuWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getByIdMenuWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageMenuWithDeletedController.execute);

router.get('/:id', checkToken, getByIdMenuController.execute);
router.get('', checkToken, getAllMenuController.execute);
router.get('/page/:pag/:limit?', checkToken, getPageMenuController.execute);
router.post('', checkToken, createMenuController.execute);
router.put('/:id', checkToken, updateMenuController.execute);
router.delete('/:id', checkToken, hardDeleteMenuController.execute);
router.patch('/:id', checkToken, softDeleteMenuController.execute);

export default router;