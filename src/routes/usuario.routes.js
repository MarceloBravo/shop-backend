import { Router } from 'express';
import getUsuarioController from '../controllers/usuario/GetUsuarioController.js';
import getAllUsuarioController from '../controllers/usuario/GetAllUsuarioController.js';
import getPageUsuarioController from '../controllers/usuario/GetPageUsuarioController.js';
import createUsuarioController from '../controllers/usuario/CreateUsuarioController.js';
import updateUsuarioController from '../controllers/usuario/UpdateUsuarioController.js';
import deleteUsuarioController from '../controllers/usuario/DeleteUsuarioController.js';
import softDeleteUsuarioController from '../controllers/usuario/SoftDeleteUsuarioController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', getUsuarioController);
router.get('', getAllUsuarioController);
router.get('/page/:pag/:limit?', getPageUsuarioController);
router.post('', checkToken, createUsuarioController);
router.put('/:id', checkToken, updateUsuarioController);
router.delete('/:id', checkToken, deleteUsuarioController);
router.delete('/borrar/:id', checkToken, softDeleteUsuarioController);

export default router;