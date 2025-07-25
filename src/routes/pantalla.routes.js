import { Router } from 'express';
import GetByIdPantallaController from '../controllers/pantalla/GetByIdPantallaController.js';
import GetAllPantallaController from '../controllers/pantalla/GetAllPantallaController.js';
import GetPagePantallaController from '../controllers/pantalla/GetPagePantallaController.js';
import GetByIdPantallaWithDeletedController from '../controllers/pantalla/GetByIdPantallaWithDeletedController.js';
import GetAllPantallaWithDeletedController from '../controllers/pantalla/GetAllPantallaWithDeletedController.js';
import GetPagePantallaWithDeletedController from '../controllers/pantalla/GetPagePantallaWithDeletedController.js';
import CreatePantallaController from '../controllers/pantalla/CreatePantallaController.js';
import UpdatePantallaController from '../controllers/pantalla/UpdatePantallaController.js';
import HardDeletePantallaController from '../controllers/pantalla/HardDeletePantallaController.js';
import SoftDeletePantallaController from '../controllers/pantalla/SoftDeletePantallaController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

const getByIdPantallaWithDeletedController = new GetByIdPantallaWithDeletedController();
const getAllPantallaWithDeletedController = new GetAllPantallaWithDeletedController();
const getPagePantallaWithDeletedController = new GetPagePantallaWithDeletedController();
const getByIdPantallaController = new GetByIdPantallaController();
const getAllPantallaController = new GetAllPantallaController();
const getPagePantallaController = new GetPagePantallaController();
const createPantallaController = new CreatePantallaController();
const updatePantallaController = new UpdatePantallaController();
const hardDeletePantallaController = new HardDeletePantallaController();
const softDeletePantallaController = new SoftDeletePantallaController();

router.get('/deleted', checkToken, getAllPantallaWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getByIdPantallaWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', checkToken, getPagePantallaWithDeletedController.execute);

router.get('/:id', getByIdPantallaController.execute);
router.get('', getAllPantallaController.execute);
router.get('/page/:pag/:limit?', getPagePantallaController.execute);
router.post('', checkToken, createPantallaController.execute);
router.put('/:id', checkToken, updatePantallaController.execute);
router.delete('/:id', checkToken, hardDeletePantallaController.execute);
router.patch('/:id', checkToken, softDeletePantallaController.execute);

export default router;