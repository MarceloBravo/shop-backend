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

router.get('/:id', getColorController);
router.get('/', getAllColorController);
router.get('/page/:pag/:limit?', getPageColorController);
router.post('/', createColorController);
router.put('/:id', updateColorController);
router.delete('/:id', deleteColorController);
router.delete('/borrar/:id', softDeleteColorController);

export default router;