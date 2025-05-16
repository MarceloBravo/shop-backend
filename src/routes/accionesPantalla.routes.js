import { Router } from 'express';
import GetByIdAccionesPantallaController from '../controllers/accionesPantalla/GetByIdAccionesPantallaController.js';
import GetByIdAccionesPantallaWithDeletedController from '../controllers/accionesPantalla/GetByIdAccionesPantallaWithDeletedController.js';
import GetAllAccionesPantallaController from '../controllers/accionesPantalla/GetAllAccionesPantallaController.js';
import GetAllAccionesPantallaWithDeletedController from '../controllers/accionesPantalla/GetAllAccionesPantallaWithDeletedController.js';
import GetPageAccionesPantallaController from '../controllers/accionesPantalla/GetPageAccionesPantallaController.js';
import GetPageAccionesPantallaWithDeletedController from '../controllers/accionesPantalla/GetPageAccionesPantallaWithDeletedController.js';
import CreateAccionesPantallaController from '../controllers/accionesPantalla/CreateAccionesPantallaController.js';
import UpdateAccionesPantallaController from '../controllers/accionesPantalla/UpdateAccionesPantallaController.js';
import HardDeleteAccionesPantallaController from '../controllers/accionesPantalla/HardDeleteAccionesPantallaController.js';
import SoftDeleteAccionesPantallaController from '../controllers/accionesPantalla/SoftDeleteAccionesPantallaController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

const getByIdAccionesPantallaController = new GetByIdAccionesPantallaController();
const getByIdAccionesPantallaWithDeletedController = new GetByIdAccionesPantallaWithDeletedController();
const getAllAccionesPantallaController = new GetAllAccionesPantallaController();
const getAllAccionesPantallaWithDeletedController = new GetAllAccionesPantallaWithDeletedController();
const getPageAccionesPantallaController = new GetPageAccionesPantallaController();
const getPageAccionesPantallaWithDeletedController = new GetPageAccionesPantallaWithDeletedController();
const createAccionesPantallaController = new CreateAccionesPantallaController(); 
const updateAccionesPantallaController = new UpdateAccionesPantallaController(); 
const deleteAccionesPantallaController = new HardDeleteAccionesPantallaController(); 
const softDeleteAccionesPantallaController = new SoftDeleteAccionesPantallaController();


router.get('/deleted', checkToken, getAllAccionesPantallaWithDeletedController.getAll);
router.get('/deleted/:id', checkToken, getByIdAccionesPantallaWithDeletedController.getById);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageAccionesPantallaWithDeletedController.getPage);
router.get('/', checkToken, getAllAccionesPantallaController.getAll);
router.get('/:id', checkToken, getByIdAccionesPantallaController.getById);
router.get('/page/:pag/:limit?', checkToken, getPageAccionesPantallaController.getPage);
router.post('/', checkToken, createAccionesPantallaController.create);
router.put('/:id', checkToken, updateAccionesPantallaController.update);
router.delete('/:id', checkToken, deleteAccionesPantallaController.hardDelete);
router.patch('/:id', checkToken, softDeleteAccionesPantallaController.softDelete);

export default router;