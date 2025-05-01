import { Router } from 'express';
import getPantallaController from '../controllers/pantalla/GetPantallaController.js';
import getAllPantallaController from '../controllers/pantalla/GetAllPantallaController.js';
import getPagePantallaController from '../controllers/pantalla/GetPagePantallaController.js';
import createPantallaController from '../controllers/pantalla/CreatePantallaController.js';
import updatePantallaController from '../controllers/pantalla/UpdatePantallaController.js';
import deletePantallaController from '../controllers/pantalla/DeletePantallaController.js';
import softDeletePantallaController from '../controllers/pantalla/SoftDeletePantallaController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', getPantallaController);
router.get('', getAllPantallaController);
router.get('/page/:pag/:limit?', getPagePantallaController);
router.post('', createPantallaController);
router.put('/:id', updatePantallaController);
router.delete('/:id', deletePantallaController);
router.delete('/borrar/:id', softDeletePantallaController);

export default router;