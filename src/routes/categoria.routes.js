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

router.get('/Categoria/:id', getCategoriaController);
router.get('/Categoria', getAllCategoriaController);
router.get('/Categoria/pag/:pag/:regPorPag?', getPageCategoriaController);
router.post('/Categoria', createCategoriaController);
router.put('/Categoria/:id', updateCategoriaController);
router.delete('/Categoria/:id', deleteCategoriaController);
router.delete('/Categoria/softdelete/:id', softDeleteCategoriaController);

export default router;