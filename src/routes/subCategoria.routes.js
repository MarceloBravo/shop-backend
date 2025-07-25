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
import { checkToken } from '../shared/mw_token.js';

const router = Router();

// Instanciar los controladores
const getByIdSubCategoriaController = new GetByIdSubCategoriaController();
const getAllSubCategoriaController = new GetAllSubCategoriaController();
const getPageSubCategoriaController = new GetPageSubCategoriaController();
const getByIdSubCategoriaWithDeletedController = new GetByIdSubCategoriaWithDeletedController();
const getAllSubCategoriaWithDeletedController = new GetAllSubCategoriaWithDeletedController();
const getPageSubCategoriaWithDeletedController = new GetPageSubCategoriaWithDeletedController();
const createSubCategoriaController = new CreateSubCategoriaController();
const updateSubCategoriaController = new UpdateSubCategoriaController();
const hardDeleteSubCategoriaController = new HardDeleteSubCategoriaController();
const softDeleteSubCategoriaController = new SoftDeleteSubCategoriaController();

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