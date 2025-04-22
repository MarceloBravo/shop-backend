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

router.get('/atributo/:id', getAtributoController);
router.get('/atributo', getAllAtributoController);
router.get('/atributo/page/:pag/:limit?', getPageAtributoController);
router.post('/atributo', createAtributoController);
router.put('/atributo/:id', updateAtributoController);
router.delete('/atributo/:id', deleteAtributoController);
router.delete('/atributo/softdelete/:id', softDeleteAtributoController);

export default router;