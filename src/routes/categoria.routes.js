import { Router } from 'express';
import GetCategoriaController from '../controllers/Categoria/GetByIdCategoriaController.js';
import GetAllCategoriaController from '../controllers/Categoria/GetAllCategoriaController.js';
import GetPageCategoriaController from '../controllers/Categoria/GetPageCategoriaController.js';
import GetCategoriaWithDeletedController from '../controllers/Categoria/GetByIdCategoriaWithDeletedController.js';
import GetAllCategoriaWithDeletedController from '../controllers/Categoria/GetAllCategoriaWithDeletedController.js';
import GetPageCategoriaWithDeletedController from '../controllers/Categoria/GetPageCategoriaWithDeletedController.js';
import CreateCategoriaController from '../controllers/Categoria/CreateCategoriaController.js';
import UpdateCategoriaController from '../controllers/Categoria/UpdateCategoriaController.js';
import HardDeleteCategoriaController from '../controllers/Categoria/HardDeleteCategoriaController.js';
import SoftDeleteCategoriaController from '../controllers/Categoria/SoftDeleteCategoriaController.js';
import CategoriaRepository from '../repositories/CategoriaRepository.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();
const repository = new CategoriaRepository();
const getCategoriaWithDeletedController = new GetCategoriaWithDeletedController(repository)
const getAllCategoriaWithDeletedController = new GetAllCategoriaWithDeletedController(repository)
const getPageCategoriaWithDeletedController = new GetPageCategoriaWithDeletedController(repository)
const getCategoriaController = new GetCategoriaController(repository)
const getAllCategoriaController = new GetAllCategoriaController(repository)
const getPageCategoriaController = new GetPageCategoriaController(repository)
const createCategoriaController = new CreateCategoriaController(repository)
const updateCategoriaController = new UpdateCategoriaController(repository)
const hardDeleteCategoriaController = new HardDeleteCategoriaController(repository)
const softDeleteCategoriaController = new SoftDeleteCategoriaController(repository)

router.get('/deleted', checkToken, getAllCategoriaWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getCategoriaWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageCategoriaWithDeletedController.execute);

router.get('', getAllCategoriaController.execute);
router.get('/:id', getCategoriaController.execute);
router.get('/page/:pag/:limit?', getPageCategoriaController.execute);
router.post('', checkToken, createCategoriaController.execute);
router.put('/:id', checkToken, updateCategoriaController.execute);
router.delete('/:id', checkToken, hardDeleteCategoriaController.execute);
router.patch('/:id', checkToken, softDeleteCategoriaController.execute);

export default router;