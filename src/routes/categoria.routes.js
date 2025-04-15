import { Router } from 'express';
import getColorController from '../controllers/color/GetColorController.js';
import getAllColorController from '../controllers/color/GetAllColorController.js';
import getPageColorController from '../controllers/color/GetPageColorController.js';
import createColorController from '../controllers/color/CreateColorController.js';
import updateColorController from '../controllers/color/UpdateColorController.js';
import deleteColorController from '../controllers/color/DeleteColorController.js';
import softDeleteColorController from '../controllers/color/SoftDeleteColorController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/color/:id', getColorController);
router.get('/color', getAllColorController);
router.get('/color/pag/:pag/:regPorPag?', getPageColorController);
router.post('/color', createColorController);
router.put('/color/:id', updateColorController);
router.delete('/color/:id', deleteColorController);
router.delete('/color/softdelete/:id', softDeleteColorController);

export default router;