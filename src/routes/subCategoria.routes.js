import { Router } from 'express';
import GetByIdSubCategoriaController from '../controllers/subCategoria/GetByIdSubCategoriaController.js';
import GetAllSubCategoriaController from '../controllers/subCategoria/GetAllSubCategoriaController.js';
import GetPageSubCategoriaController from '../controllers/subCategoria/GetPageSubCategoriaController.js';
import GetByIdSubCategoriaWithDeletedController from '../controllers/subCategoria/GetByIdSubCategoriaWithDeletedController.js';
import GetAllSubCategoriaWithDeletedController from '../controllers/subCategoria/GetAllSubCategoriaWithDeletedController.js';
import GetPageSubCategoriaWithDeletedController from '../controllers/subCategoria/GetPageSubCategoriaWithDeletedController.js';
import CreateSubCategoriaController from '../controllers/subCategoria/CreateSubCategoriaController.js';
import UpdateSubCategoriaController from '../controllers/subCategoria/UpdateSubCategoriaController.js';
import HardDeleteSubCategoriaController from '../controllers/subCategoria/HardDeleteSubCategoriaController.js';
import SoftDeleteSubCategoriaController from '../controllers/subCategoria/SoftDeleteSubCategoriaController.js';
import SubCategoriaRepository from "../repositories/SubCategoriaRepository.js";
import { checkToken } from '../shared/mw_token.js';

const router = Router();
const repository = new SubCategoriaRepository();

// Instanciar los controladores
const getByIdSubCategoriaController = new GetByIdSubCategoriaController(repository);
const getAllSubCategoriaController = new GetAllSubCategoriaController(repository);
const getPageSubCategoriaController = new GetPageSubCategoriaController(repository);
const getByIdSubCategoriaWithDeletedController = new GetByIdSubCategoriaWithDeletedController(repository);
const getAllSubCategoriaWithDeletedController = new GetAllSubCategoriaWithDeletedController(repository);
const getPageSubCategoriaWithDeletedController = new GetPageSubCategoriaWithDeletedController(repository);
const createSubCategoriaController = new CreateSubCategoriaController(repository);
const updateSubCategoriaController = new UpdateSubCategoriaController(repository);
const hardDeleteSubCategoriaController = new HardDeleteSubCategoriaController(repository);
const softDeleteSubCategoriaController = new SoftDeleteSubCategoriaController(repository);

// Definir las rutas
router.get('/deleted', checkToken, getAllSubCategoriaWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getByIdSubCategoriaWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageSubCategoriaWithDeletedController.execute);

router.get('/:id', getByIdSubCategoriaController.execute);
router.get('/', getAllSubCategoriaController.execute);
router.get('/page/:pag/:limit?', getPageSubCategoriaController.execute);
router.post('/', checkToken, createSubCategoriaController.execute);
router.put('/:id', checkToken, updateSubCategoriaController.execute);
router.delete('/:id', checkToken, hardDeleteSubCategoriaController.execute);
router.patch('/:id', checkToken, softDeleteSubCategoriaController.execute);

export default router;