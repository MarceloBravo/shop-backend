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

router.get('/:id', getMaterialController);
router.get('/', getAllMaterialController);
router.get('/:pag/:limit?', getPageMaterialController);
router.post('/', checkToken, createMaterialController);
router.put('/:id', checkToken, updateMaterialController);
router.delete('/:id', checkToken, deleteMaterialController);
router.delete('/borrar/:id', checkToken, softDeleteMaterialController);

export default router;