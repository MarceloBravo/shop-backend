import { Router } from 'express';
import GetByIdMaterialController from '../controllers/materiales/GetByIdMaterialController.js';
import GetAllMaterialController from '../controllers/materiales/GetAllMaterialController.js';
import GetPageMaterialController from '../controllers/materiales/GetPageMaterialController.js';
import GetByIdMaterialWithDeletedController from '../controllers/materiales/GetByIdMaterialWithDeletedController.js';
import GetAllMaterialWithDeletedController from '../controllers/materiales/GetAllMaterialWithDeletedController.js';
import GetPageMaterialWithDeletedController from '../controllers/materiales/GetPageMaterialWithDeletedController.js';
import CreateMaterialController from '../controllers/materiales/CreateMaterialController.js';
import UpdateMaterialController from '../controllers/materiales/UpdateMaterialController.js';
import HardDeleteMaterialController from '../controllers/materiales/HardDeleteMaterialController.js';
import SoftDeleteMaterialController from '../controllers/materiales/SoftDeleteMaterialController.js';
import MaterialRepository from "../repositories/MaterialRepository.js";
import { checkToken } from '../shared/mw_token.js';

const router = Router();
const repository = new MaterialRepository();
const getByIdMaterialController = new GetByIdMaterialController(repository);
const getAllMaterialController = new GetAllMaterialController(repository);
const getPageMaterialController = new GetPageMaterialController(repository);
const getByIdMaterialWithDeletedController = new GetByIdMaterialWithDeletedController(repository);
const getAllMaterialWithDeletedController = new GetAllMaterialWithDeletedController(repository);
const getPageMaterialWithDeletedController = new GetPageMaterialWithDeletedController(repository);
const createMaterialController = new CreateMaterialController(repository);
const updateMaterialController = new UpdateMaterialController(repository);
const hardDeleteMaterialController = new HardDeleteMaterialController(repository);
const softDeleteMaterialController = new SoftDeleteMaterialController(repository);

router.get('/deleted', checkToken, getAllMaterialWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getByIdMaterialWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageMaterialWithDeletedController.execute);

router.get('/', getAllMaterialController.execute);
router.get('/:id', getByIdMaterialController.execute);
router.get('/page/:pag/:limit?', getPageMaterialController.execute);
router.post('/', checkToken, createMaterialController.execute);
router.put('/:id', checkToken, updateMaterialController.execute);
router.delete('/:id', checkToken, hardDeleteMaterialController.execute);
router.patch('/:id', checkToken, softDeleteMaterialController.execute);

export default router;