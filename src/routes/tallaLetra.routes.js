import { Router } from 'express';
import getTallaLetraController from '../controllers/tallaLetra/GetTallaLetraController.js';
import getAllTallaLetraController from '../controllers/tallaLetra/GetAllTallaLetraController.js';
import getPageTallaLetraController from '../controllers/tallaLetra/GetPageTallaLetraController.js';
import createTallaLetraController from '../controllers/tallaLetra/CreateTallaLetraController.js';
import updateTallaLetraController from '../controllers/tallaLetra/UpdateTallaLetraController.js';
import deleteTallaLetraController from '../controllers/tallaLetra/DeleteTallaLetraController.js';
import softDeleteTallaLetraController from '../controllers/tallaLetra/SoftDeleteTallaLetraController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', getTallaLetraController);
router.get('/', getAllTallaLetraController);
router.get('/:pag/:limit?', getPageTallaLetraController);
router.post('/', checkToken, createTallaLetraController);
router.put('/:id', checkToken, updateTallaLetraController);
router.delete('/:id', checkToken, deleteTallaLetraController);
router.delete('/borrar/:id', checkToken, softDeleteTallaLetraController);

export default router;