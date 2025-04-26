import { Router } from 'express';
import getCategoriaController from '../controllers/Categoria/GetCategoriaController.js';
import getAllCategoriaController from '../controllers/Categoria/GetAllCategoriaController.js';
import getPageCategoriaController from '../controllers/Categoria/GetPageCategoriaController.js';
import createCategoriaController from '../controllers/Categoria/CreateCategoriaController.js';
import updateCategoriaController from '../controllers/Categoria/UpdateCategoriaController.js';
import deleteCategoriaController from '../controllers/Categoria/DeleteCategoriaController.js';
import softDeleteCategoriaController from '../controllers/Categoria/SoftDeleteCategoriaController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', getCategoriaController);
router.get('', getAllCategoriaController);
router.get('/page/:pag/:limit?', getPageCategoriaController);
router.post('', createCategoriaController);
router.put('/:id', updateCategoriaController);
router.delete('/:id', deleteCategoriaController);
router.delete('/borrar/:id', softDeleteCategoriaController);

export default router;