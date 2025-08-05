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
import { checkToken } from '../shared/mw_token.js';

const router = Router();

const getByIdMaterialController = new GetByIdMaterialController();
const getAllMaterialController = new GetAllMaterialController();
const getPageMaterialController = new GetPageMaterialController();
const getByIdMaterialWithDeletedController = new GetByIdMaterialWithDeletedController();
const getAllMaterialWithDeletedController = new GetAllMaterialWithDeletedController();
const getPageMaterialWithDeletedController = new GetPageMaterialWithDeletedController();
const createMaterialController = new CreateMaterialController();
const updateMaterialController = new UpdateMaterialController();
const hardDeleteMaterialController = new HardDeleteMaterialController();
const softDeleteMaterialController = new SoftDeleteMaterialController();

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