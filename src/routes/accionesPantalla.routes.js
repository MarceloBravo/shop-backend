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
import AccionesPantallaRepository from "../repositories/AccionesPantallaRepository.js";
import { checkToken } from '../shared/mw_token.js';

const router = Router();
const repository = new AccionesPantallaRepository();

const getByIdAccionesPantallaController = new GetByIdAccionesPantallaController(repository)
const getByIdAccionesPantallaWithDeletedController = new GetByIdAccionesPantallaWithDeletedController(repository)
const getAllAccionesPantallaController = new GetAllAccionesPantallaController(repository)
const getAllAccionesPantallaWithDeletedController = new GetAllAccionesPantallaWithDeletedController(repository)
const getPageAccionesPantallaController = new GetPageAccionesPantallaController(repository)
const getPageAccionesPantallaWithDeletedController = new GetPageAccionesPantallaWithDeletedController(repository)
const createAccionesPantallaController = new CreateAccionesPantallaController(repository) 
const updateAccionesPantallaController = new UpdateAccionesPantallaController(repository) 
const deleteAccionesPantallaController = new HardDeleteAccionesPantallaController(repository) 
const softDeleteAccionesPantallaController = new SoftDeleteAccionesPantallaController(repository)


router.get('/deleted', checkToken, getAllAccionesPantallaWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getByIdAccionesPantallaWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageAccionesPantallaWithDeletedController.execute);
router.get('/', checkToken, getAllAccionesPantallaController.execute);
router.get('/:id', checkToken, getByIdAccionesPantallaController.execute);
router.get('/page/:pag/:limit?', checkToken, getPageAccionesPantallaController.execute);
router.post('/', checkToken, createAccionesPantallaController.execute);
router.put('/:id', checkToken, updateAccionesPantallaController.execute);
router.delete('/:id', checkToken, deleteAccionesPantallaController.execute);
router.patch('/:id', checkToken, softDeleteAccionesPantallaController.execute);

export default router;