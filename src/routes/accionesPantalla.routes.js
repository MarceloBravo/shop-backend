import { Router } from 'express';
import GetOneAccionesPantallaController from '../controllers/accionesPantalla/GetOneAccionesPantallaController.js';
import GetAllAccionesPantallaController from '../controllers/accionesPantalla/GetAllAccionesPantallaController.js';
import GetPageAccionesPantallaController from '../controllers/accionesPantalla/GetPageAccionesPantallaController.js';
import CreateAccionesPantallaController from '../controllers/accionesPantalla/CreateAccionesPantallaController.js';
import UpdateAccionesPantallaController from '../controllers/accionesPantalla/UpdateAccionesPantallaController.js';
import HardDeleteAccionesPantallaController from '../controllers/accionesPantalla/HardDeleteAccionesPantallaController.js';
import SoftDeleteAccionesPantallaController from '../controllers/accionesPantalla/SoftDeleteAccionesPantallaController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

const getOneAccionesPantallaController = new GetOneAccionesPantallaController();
const getAllAccionesPantallaController = new GetAllAccionesPantallaController();
const getPageAccionesPantallaController = new GetPageAccionesPantallaController();
const createAccionesPantallaController = new CreateAccionesPantallaController(); 
const updateAccionesPantallaController = new UpdateAccionesPantallaController(); 
const deleteAccionesPantallaController = new HardDeleteAccionesPantallaController(); 
const softDeleteAccionesPantallaController = new SoftDeleteAccionesPantallaController();


router.get('/:id', checkToken, getOneAccionesPantallaController.getOne);
router.get('/', checkToken, getAllAccionesPantallaController.getAll);
router.get('/page/:pag/:limit?', checkToken, getPageAccionesPantallaController.getPage);
router.post('/', checkToken, createAccionesPantallaController.create);
router.put('/:id', checkToken, updateAccionesPantallaController.update);
router.delete('/:id', checkToken, deleteAccionesPantallaController.hardDelete);
router.patch('/:id', checkToken, softDeleteAccionesPantallaController.softDelete);

export default router;