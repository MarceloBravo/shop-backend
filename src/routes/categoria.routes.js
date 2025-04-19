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

router.get('/categoria/:id', getCategoriaController);
router.get('/categoria', getAllCategoriaController);
router.get('/categoria/page/:pag/:limit?', getPageCategoriaController);
router.post('/categoria', createCategoriaController);
router.put('/categoria/:id', updateCategoriaController);
router.delete('/categoria/:id', deleteCategoriaController);
router.delete('/categoria/softdelete/:id', softDeleteCategoriaController);

export default router;