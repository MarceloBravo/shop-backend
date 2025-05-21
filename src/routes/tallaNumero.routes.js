import { Router } from 'express';
import GetByIdTallaNumeroController from '../controllers/tallaNumero/GetByIdTallaNumeroController.js';
import GetAllTallaNumeroController from '../controllers/tallaNumero/GetAllTallaNumeroController.js';
import GetPageTallaNumeroController from '../controllers/tallaNumero/GetPageTallaNumeroController.js';
import CreateTallaNumeroController from '../controllers/tallaNumero/CreateTallaNumeroController.js';
import UpdateTallaNumeroController from '../controllers/tallaNumero/UpdateTallaNumeroController.js';
import HardDeleteTallaNumeroController from '../controllers/tallaNumero/HardDeleteTallaNumeroController.js';
import SoftDeleteTallaNumeroController from '../controllers/tallaNumero/SoftDeleteTallaNumeroController.js';
import GetByIdTallaNumeroWithDeletedController from '../controllers/tallaNumero/GetByIdTallaNumeroWithDeletedController.js';
import GetAllTallaNumeroWithDeletedController from '../controllers/tallaNumero/GetAllTallaNumeroWithDeletedController.js';
import GetPageTallaNumeroWithDeletedController from '../controllers/tallaNumero/GetPageTallaNumeroWithDeletedController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

// Instanciamos los controladores
const getByIdTallaNumeroController = new GetByIdTallaNumeroController();
const getAllTallaNumeroController = new GetAllTallaNumeroController();
const getPageTallaNumeroController = new GetPageTallaNumeroController();
const createTallaNumeroController = new CreateTallaNumeroController();
const updateTallaNumeroController = new UpdateTallaNumeroController();
const hardDeleteTallaNumeroController = new HardDeleteTallaNumeroController();
const softDeleteTallaNumeroController = new SoftDeleteTallaNumeroController();
const getByIdTallaNumeroWithDeletedController = new GetByIdTallaNumeroWithDeletedController();
const getAllTallaNumeroWithDeletedController = new GetAllTallaNumeroWithDeletedController();
const getPageTallaNumeroWithDeletedController = new GetPageTallaNumeroWithDeletedController();

// Rutas para registros eliminados
router.get('/deleted', checkToken, getAllTallaNumeroWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getByIdTallaNumeroWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageTallaNumeroWithDeletedController.execute);

// Rutas principales
router.get('/', getAllTallaNumeroController.execute);
router.get('/:id', getByIdTallaNumeroController.execute);
router.get('/page/:pag/:limit?', getPageTallaNumeroController.execute);
router.post('/', checkToken, createTallaNumeroController.execute);
router.put('/:id', checkToken, updateTallaNumeroController.execute);
router.delete('/:id', checkToken, hardDeleteTallaNumeroController.execute);
router.patch('/:id', checkToken, softDeleteTallaNumeroController.execute);

export default router;