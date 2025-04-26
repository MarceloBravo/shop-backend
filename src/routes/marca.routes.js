import { Router } from 'express';
import getMarcaController from '../controllers/marca/GetMarcaController.js';
import getAllMarcaController from '../controllers/marca/GetAllMarcaController.js';
import getPageMarcaController from '../controllers/marca/GetPageMarcaController.js';
import createMarcaController from '../controllers/marca/CreateMarcaController.js';
import updateMarcaController from '../controllers/marca/UpdateMarcaController.js';
import deleteMarcaController from '../controllers/marca/DeleteMarcaController.js';
import softDeleteMarcaController from '../controllers/marca/SoftDeleteMarcaController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', getMarcaController);
router.get('', getAllMarcaController);
router.get('/page/:pag/:limit?', getPageMarcaController);
router.post('', createMarcaController);
router.put('/:id', updateMarcaController);
router.delete('/:id', deleteMarcaController);
router.delete('/borrar/:id', softDeleteMarcaController);

export default router;