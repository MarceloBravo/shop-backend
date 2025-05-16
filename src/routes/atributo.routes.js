import { Router } from 'express';
import GetByIdAtributoController from '../controllers/atributo/GetByIdAtributoController.js';
import GetByIdAtributoWithDeletedController from '../controllers/atributo/GetByIdAtributoWithDeletedController.js';
import GetAllAtributoController from '../controllers/atributo/GetAllAtributoController.js';
import GetAllAtributoWithDeletedController from '../controllers/atributo/GetAllAtributoWithDeletedController.js';
import GetPageAtributoController from '../controllers/atributo/GetPageAtributoController.js';
import GetPageAtributoWithDeletedController from '../controllers/atributo/GetPageAtributoWithDeletedController.js';
import CreateAtributoController from '../controllers/atributo/CreateAtributoController.js';
import UpdateAtributoController from '../controllers/atributo/UpdateAtributoController.js';
import HardDeleteAtributoController from '../controllers/atributo/HardDeleteAtributoController.js';
import SoftDeleteAtributoController from '../controllers/atributo/SoftDeleteAtributoController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

const getByIdAtributoController = new GetByIdAtributoController();
const getByIdAtributoWithDeletedController = new GetByIdAtributoWithDeletedController();
const getAllAtributoController = new GetAllAtributoController();
const getAllAtributoWithDeletedController = new GetAllAtributoWithDeletedController();
const getPageAtributoController = new GetPageAtributoController();
const getPageAtributoWithDeletedController = new GetPageAtributoWithDeletedController();
const createAtributoController = new CreateAtributoController();
const updateAtributoController = new UpdateAtributoController();
const hardDeleteAtributoController = new HardDeleteAtributoController();
const softDeleteAtributoController = new SoftDeleteAtributoController();

router.get('/deleted', checkToken, getAllAtributoWithDeletedController.getAll);
router.get('/deleted/:id', checkToken, getByIdAtributoWithDeletedController.getById);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageAtributoWithDeletedController.getPage);

router.get('/:id', getByIdAtributoController.getById);
router.get('/', getAllAtributoController.getAll);
router.get('/page/:pag/:limit?', getPageAtributoController.getPage);
router.post('/', checkToken, createAtributoController.create);
router.put('/:id', checkToken, updateAtributoController.update);
router.delete('/:id', checkToken, hardDeleteAtributoController.delete);
router.patch('/:id', checkToken, softDeleteAtributoController.delete);

export default router;