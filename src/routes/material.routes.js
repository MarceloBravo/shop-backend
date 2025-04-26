import { Router } from 'express';
import getMaterialController from '../controllers/materiales/GetMaterialController.js';
import getAllMaterialController from '../controllers/materiales/GetAllMaterialController.js';
import getPageMaterialController from '../controllers/materiales/GetPageMaterialController.js';
import createMaterialController from '../controllers/materiales/CreateMaterialController.js';
import updateMaterialController from '../controllers/materiales/UpdateMaterialController.js';
import deleteMaterialController from '../controllers/materiales/DeleteMaterialController.js';
import softDeleteMaterialController from '../controllers/materiales/SoftDeleteMaterialController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/materiales/:id', getMaterialController);
router.get('/materiales', getAllMaterialController);
router.get('/materiales/page/:pag/:limit?', getPageMaterialController);
router.post('/materiales', createMaterialController);
router.put('/materiales/:id', updateMaterialController);
router.delete('/materiales/:id', deleteMaterialController);
router.delete('/materiales/softdelete/:id', softDeleteMaterialController);

export default router;