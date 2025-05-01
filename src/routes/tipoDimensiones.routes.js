import { Router } from 'express';
import getTipoDimensionesController from '../controllers/tipoDimensiones/GetTipoDimensionesController.js';
import getAllTipoDimensionesController from '../controllers/tipoDimensiones/GetAllTipoDimensionesController.js';
import getPageTipoDimensionesController from '../controllers/tipoDimensiones/GetPageTipoDimensionesController.js';
import createTipoDimensionesController from '../controllers/tipoDimensiones/CreateTipoDimensionesController.js';
import updateTipoDimensionesController from '../controllers/tipoDimensiones/UpdateTipoDimensionesController.js';
import deleteTipoDimensionesController from '../controllers/tipoDimensiones/DeleteTipoDimensionesController.js';
import softDeleteTipoDimensionesController from '../controllers/tipoDimensiones/SoftDeleteTipoDimensionesController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', getTipoDimensionesController);
router.get('/', getAllTipoDimensionesController);
router.get('/:pag/:limit?', getPageTipoDimensionesController);
router.post('/', checkToken, createTipoDimensionesController);
router.put('/:id', checkToken, updateTipoDimensionesController);
router.delete('/:id', checkToken, deleteTipoDimensionesController);
router.delete('/borrar/:id', checkToken, softDeleteTipoDimensionesController);

export default router;