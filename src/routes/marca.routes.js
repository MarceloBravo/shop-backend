import { Router } from 'express';
import GetByIdMarcaController from '../controllers/marca/GetByIdMarcaController.js';
import GetAllMarcaController from '../controllers/marca/GetAllMarcaController.js';
import GetPageMarcaController from '../controllers/marca/GetPageMarcaController.js';
import GetByIdMarcaWithDeletedController from '../controllers/marca/GetByIdMarcaWithDeletedController.js';
import GetAllMarcaWithDeletedController from '../controllers/marca/GetAllMarcaWithDeletedController.js';
import GetPageMarcaWithDeletedController from '../controllers/marca/GetPageMarcaWithDeletedController.js';
import CreateMarcaController from '../controllers/marca/CreateMarcaController.js';
import UpdateMarcaController from '../controllers/marca/UpdateMarcaController.js';
import HardDeleteMarcaController from '../controllers/marca/HardDeleteMarcaController.js';
import SoftDeleteMarcaController from '../controllers/marca/SoftDeleteMarcaController.js';
import MarcaRepository from '../repositories/MarcaRepository.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();
const repository = new MarcaRepository()

const getByIdMarcaController = new GetByIdMarcaController(repository);
const getAllMarcaController = new GetAllMarcaController(repository);
const getPageMarcaController = new GetPageMarcaController(repository);
const getByIdMarcaWithDeletedController = new GetByIdMarcaWithDeletedController(repository);
const getAllMarcaWithDeletedController = new GetAllMarcaWithDeletedController(repository);
const getPageMarcaWithDeletedController = new GetPageMarcaWithDeletedController(repository);
const createMarcaController = new CreateMarcaController(repository);
const updateMarcaController = new UpdateMarcaController(repository);
const deleteMarcaController = new HardDeleteMarcaController(repository);
const softDeleteMarcaController = new SoftDeleteMarcaController(repository);

router.get('/deleted', checkToken, getAllMarcaWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getByIdMarcaWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageMarcaWithDeletedController.execute);

router.get('/:id', getByIdMarcaController.execute);
router.get('', getAllMarcaController.execute);
router.get('/page/:pag/:limit?', getPageMarcaController.execute);
router.post('', checkToken, createMarcaController.execute);
router.put('/:id', checkToken, updateMarcaController.execute);
router.delete('/:id', checkToken, deleteMarcaController.execute);
router.patch('/:id', checkToken, softDeleteMarcaController.execute);

export default router;