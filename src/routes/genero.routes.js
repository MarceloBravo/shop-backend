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
import { checkToken } from '../shared/mw_token.js';

const router = Router();

const getGeneroController = new GetByIdGeneroController();
const getAllGeneroController = new GetAllGeneroController();
const getPageGeneroController = new GetPageGeneroController();
const getAllGeneroWithDeletedController = new GetAllGeneroWithDeletedController();
const getByIdGeneroWithDeletedController = new GetByIdGeneroWithDeletedController();
const getPageGeneroWithDeletedController = new GetPageGeneroWithDeletedController();
const createGeneroController = new CreateGeneroController();
const updateGeneroController = new UpdateGeneroController();
const hardDeleteGeneroController = new HardDeleteGeneroController();
const softDeleteGeneroController = new SoftDeleteGeneroController();

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