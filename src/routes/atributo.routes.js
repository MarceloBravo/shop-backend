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
import AtributosRepository from "../repositories/AtributosRepository.js";
import { checkToken } from '../shared/mw_token.js';

const router = Router();
const repository = new AtributosRepository();

const getByIdAtributoController = new GetByIdAtributoController(repository)
const getByIdAtributoWithDeletedController = new GetByIdAtributoWithDeletedController(repository)
const getAllAtributoController = new GetAllAtributoController(repository)
const getAllAtributoWithDeletedController = new GetAllAtributoWithDeletedController(repository)
const getPageAtributoController = new GetPageAtributoController(repository)
const getPageAtributoWithDeletedController = new GetPageAtributoWithDeletedController(repository)
const createAtributoController = new CreateAtributoController(repository)
const updateAtributoController = new UpdateAtributoController(repository)
const hardDeleteAtributoController = new HardDeleteAtributoController(repository)
const softDeleteAtributoController = new SoftDeleteAtributoController(repository)

router.get('/deleted', checkToken, getAllAtributoWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getByIdAtributoWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageAtributoWithDeletedController.execute);

router.get('/:id', getByIdAtributoController.execute);
router.get('/', getAllAtributoController.execute);
router.get('/page/:pag/:limit?', getPageAtributoController.execute);
router.post('/', checkToken, createAtributoController.execute);
router.put('/:id', checkToken, updateAtributoController.execute);
router.delete('/:id', checkToken, hardDeleteAtributoController.execute);
router.patch('/:id', checkToken, softDeleteAtributoController.execute);

export default router;