import { Router } from 'express';
import getAccionesPantallaController from '../controllers/accionesPantalla/GetAccionesPantallaController.js';
import getAllAccionesPantallaController from '../controllers/accionesPantalla/GetAllAccionesPantallaController.js';
import getPageAccionesPantallaController from '../controllers/accionesPantalla/GetPageAccionesPantallaController.js';
import createAccionesPantallaController from '../controllers/accionesPantalla/CreateAccionesPantallaController.js';
import updateAccionesPantallaController from '../controllers/accionesPantalla/UpdateAccionesPantallaController.js';
import deleteAccionesPantallaController from '../controllers/accionesPantalla/DeleteAccionesPantallaController.js';
import softDeleteAccionesPantallaController from '../controllers/accionesPantalla/SoftDeleteAccionesPantallaController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', checkToken, getAccionesPantallaController);
router.get('/', checkToken, getAllAccionesPantallaController);
router.get('/page/:pag/:limit?', checkToken, getPageAccionesPantallaController);
router.post('/', checkToken, createAccionesPantallaController);
router.put('/:id', checkToken, updateAccionesPantallaController);
router.delete('/:id', checkToken, deleteAccionesPantallaController);
router.delete('/borrar/:id', checkToken, softDeleteAccionesPantallaController);

export default router;