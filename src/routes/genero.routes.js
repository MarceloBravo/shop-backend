import { Router } from 'express';
import getGeneroController from '../controllers/genero/GetGeneroController.js';
import getAllGeneroController from '../controllers/genero/GetAllGeneroController.js';
import getPageGeneroController from '../controllers/genero/GetPageGeneroController.js';
import createGeneroController from '../controllers/genero/CreateGeneroController.js';
import updateGeneroController from '../controllers/genero/UpdateGeneroController.js';
import deleteGeneroController from '../controllers/genero/DeleteGeneroController.js';
import softDeleteGeneroController from '../controllers/genero/SoftDeleteGeneroController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', getGeneroController);
router.get('', getAllGeneroController);
router.get('/page/:pag/:limit?', getPageGeneroController);
router.post('', checkToken, createGeneroController);
router.put('/:id',checkToken, updateGeneroController);
router.delete('/:id', checkToken, deleteGeneroController);
router.delete('/borrar/:id', checkToken, softDeleteGeneroController);

export default router;