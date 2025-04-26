import { Router } from 'express';
import getAtributoController from '../controllers/atributo/GetAtributoController.js';
import getAllAtributoController from '../controllers/atributo/GetAllAtributoController.js';
import getPageAtributoController from '../controllers/atributo/GetPageAtributoController.js';
import createAtributoController from '../controllers/atributo/CreateAtributoController.js';
import updateAtributoController from '../controllers/atributo/UpdateAtributoController.js';
import deleteAtributoController from '../controllers/atributo/DeleteAtributoController.js';
import softDeleteAtributoController from '../controllers/atributo/SoftDeleteAtributoController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', getAtributoController);
router.get('/', getAllAtributoController);
router.get('/page/:pag/:limit?', getPageAtributoController);
router.post('/', createAtributoController);
router.put('/:id', updateAtributoController);
router.delete('/:id', deleteAtributoController);
router.delete('/borrar/:id', softDeleteAtributoController);

export default router;