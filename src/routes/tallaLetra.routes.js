import { Router } from 'express';
import GetByIdTallaLetraController from '../controllers/tallaLetra/GetByIdTallaLetraController.js';
import GetAllTallaLetraController from '../controllers/tallaLetra/GetAllTallaLetraController.js';
import GetPageTallaLetraController from '../controllers/tallaLetra/GetPageTallaLetraController.js';
import GetByIdTallaLetraWithDeletedController from '../controllers/tallaLetra/GetByIdTallaLetraWithDeletedController.js';
import GetAllTallaLetraWithDeletedController from '../controllers/tallaLetra/GetAllTallaLetraWithDeletedController.js';
import GetPageTallaLetraWithDeletedController from '../controllers/tallaLetra/GetPageTallaLetraWithDeletedController.js';
import CreateTallaLetraController from '../controllers/tallaLetra/CreateTallaLetraController.js';
import UpdateTallaLetraController from '../controllers/tallaLetra/UpdateTallaLetraController.js';
import SoftDeleteTallaLetraController from '../controllers/tallaLetra/SoftDeleteTallaLetraController.js';
import HardDeleteTallaLetraController from '../controllers/tallaLetra/HardDeleteTallaLetraController.js';
import TallaLetraRepository from '../repositories/TallaLetraRepository.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();
const repository = new TallaLetraRepository();

// Instanciar controladores
const getByIdTallaLetraController = new GetByIdTallaLetraController(repository);
const getAllTallaLetraController = new GetAllTallaLetraController(repository);
const getPageTallaLetraController = new GetPageTallaLetraController(repository);
const createTallaLetraController = new CreateTallaLetraController(repository);
const updateTallaLetraController = new UpdateTallaLetraController(repository);
const getByIdWithDeletedController = new GetByIdTallaLetraWithDeletedController(repository);
const getAllWithDeletedController = new GetAllTallaLetraWithDeletedController(repository);
const getPageWithDeletedController = new GetPageTallaLetraWithDeletedController(repository);
const hardDeleteController = new HardDeleteTallaLetraController(repository);
const softDeleteController = new SoftDeleteTallaLetraController(repository);

// Rutas para registros eliminados
router.get('/deleted', checkToken, getAllWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getByIdWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageWithDeletedController.execute);

// Rutas para registros activos
router.get('/', getAllTallaLetraController.execute);
router.get('/:id', getByIdTallaLetraController.execute);
router.get('/page/:pag/:limit?', getPageTallaLetraController.execute);
router.post('/', checkToken, createTallaLetraController.execute);
router.put('/:id', checkToken, updateTallaLetraController.execute);
router.delete('/:id', checkToken, hardDeleteController.execute);
router.patch('/:id', checkToken, softDeleteController.execute);


export default router;