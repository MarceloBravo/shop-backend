import { Router } from 'express';
import getTallaNumeroController from '../controllers/tallaNumero/GetTallaNumeroController.js';
import getAllTallaNumeroController from '../controllers/tallaNumero/GetAllTallaNumeroController.js';
import getPageTallaNumeroController from '../controllers/tallaNumero/GetPageTallaNumeroController.js';
import createTallaNumeroController from '../controllers/tallaNumero/CreateTallaNumeroController.js';
import updateTallaNumeroController from '../controllers/tallaNumero/UpdateTallaNumeroController.js';
import deleteTallaNumeroController from '../controllers/tallaNumero/DeleteTallaNumeroController.js';
import softDeleteTallaNumeroController from '../controllers/tallaNumero/SoftDeleteTallaNumeroController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', getTallaNumeroController);
router.get('/', getAllTallaNumeroController);
router.get('/:pag/:limit?', getPageTallaNumeroController);
router.post('/', checkToken, createTallaNumeroController);
router.put('/:id', checkToken, updateTallaNumeroController);
router.delete('/:id', checkToken, deleteTallaNumeroController);
router.delete('/borrar/:id', checkToken, softDeleteTallaNumeroController);

export default router;