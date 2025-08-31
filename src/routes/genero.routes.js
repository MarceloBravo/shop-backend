import { Router } from 'express';
import GetByIdGeneroController from '../controllers/genero/GetByIdGeneroController.js';
import GetAllGeneroController from '../controllers/genero/GetAllGeneroController.js';
import GetPageGeneroController from '../controllers/genero/GetPageGeneroController.js';
import GetByIdGeneroWithDeletedController from '../controllers/genero/GetByIdGeneroWithDeletedController.js';
import GetAllGeneroWithDeletedController from '../controllers/genero/GetAllGeneroWithDeletedController.js';
import GetPageGeneroWithDeletedController from '../controllers/genero/GetPageGeneroWithDeletedController.js';
import CreateGeneroController from '../controllers/genero/CreateGeneroController.js';
import UpdateGeneroController from '../controllers/genero/UpdateGeneroController.js';
import HardDeleteGeneroController from '../controllers/genero/HardDeleteGeneroController.js';
import SoftDeleteGeneroController from '../controllers/genero/SoftDeleteGeneroController.js';
import GeneroRepository from '../repositories/GeneroRepository.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();
const repository = new GeneroRepository();

const getGeneroController = new GetByIdGeneroController(repository);
const getAllGeneroController = new GetAllGeneroController(repository);
const getPageGeneroController = new GetPageGeneroController(repository);
const getAllGeneroWithDeletedController = new GetAllGeneroWithDeletedController(repository);
const getByIdGeneroWithDeletedController = new GetByIdGeneroWithDeletedController(repository);
const getPageGeneroWithDeletedController = new GetPageGeneroWithDeletedController(repository);
const createGeneroController = new CreateGeneroController(repository);
const updateGeneroController = new UpdateGeneroController(repository);
const hardDeleteGeneroController = new HardDeleteGeneroController(repository);
const softDeleteGeneroController = new SoftDeleteGeneroController(repository);

router.get('/deleted', checkToken, getAllGeneroWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getByIdGeneroWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageGeneroWithDeletedController.execute);

router.get('/:id', getGeneroController.execute);
router.get('', getAllGeneroController.execute);
router.get('/page/:pag/:limit?', getPageGeneroController.execute);
router.post('', checkToken, createGeneroController.execute);
router.put('/:id',checkToken, updateGeneroController.execute);
router.delete('/:id', checkToken, hardDeleteGeneroController.execute);
router.patch('/:id', checkToken, softDeleteGeneroController.execute);

export default router;