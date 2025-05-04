import { Router } from 'express';
import getSubCategoriaController from '../controllers/subCategoria/GetSubCategoriaController.js';
import getAllSubCategoriaController from '../controllers/subCategoria/GetAllSubCategoriaController.js';
import getPageSubCategoriaController from '../controllers/subCategoria/GetPageSubCategoriaController.js';
import createSubCategoriaController from '../controllers/subCategoria/CreateSubCategoriaController.js';
import updateSubCategoriaController from '../controllers/subCategoria/UpdateSubCategoriaController.js';
import deleteSubCategoriaController from '../controllers/subCategoria/DeleteSubCategoriaController.js';
import softDeleteSubCategoriaController from '../controllers/subCategoria/SoftDeleteSubCategoriaController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', getSubCategoriaController);
router.get('', getAllSubCategoriaController);
router.get('/page/:pag/:limit?', getPageSubCategoriaController);
router.post('', checkToken, createSubCategoriaController);
router.put('/:id', checkToken, updateSubCategoriaController);
router.delete('/:id', checkToken, deleteSubCategoriaController);
router.delete('/borrar/:id', checkToken, softDeleteSubCategoriaController);

export default router;