import { Router } from 'express';
import GetColorController from '../controllers/color/GetColorController.js';
import GetAllColorController from '../controllers/color/GetAllColorController.js';
import GetPageColorController from '../controllers/color/GetPageColorController.js';
import GetColorWithDeletedController from '../controllers/color/GetColorWithDeletedController.js';
import GetAllColorWithDeletedController from '../controllers/color/GetAllColorWithDeletedController.js';
import GetPageColorWithDeletedController from '../controllers/color/GetPageColorWithDeletedController.js';
import CreateColorController from '../controllers/color/CreateColorController.js';
import UpdateColorController from '../controllers/color/UpdateColorController.js';
import HardDeleteColorController from '../controllers/color/HardDeleteColorController.js';
import SoftDeleteColorController from '../controllers/color/SoftDeleteColorController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

const getColorController = new GetColorController();
const getAllColorController = new GetAllColorController();
const getPageColorController = new GetPageColorController();
const createColorController = new CreateColorController();
const updateColorController = new UpdateColorController();
const hardDeleteColorController = new HardDeleteColorController();
const softDeleteColorController = new SoftDeleteColorController();
const getColorWithDeletedController = new GetColorWithDeletedController();
const getAllColorWithDeletedController = new GetAllColorWithDeletedController();
const getPageColorWithDeletedController = new GetPageColorWithDeletedController();


router.get('/deleted', checkToken, getAllColorWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getColorWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageColorWithDeletedController.execute);

router.get('/', getAllColorController.execute);
router.get('/:id', getColorController.execute);
router.get('/page/:pag/:limit?', getPageColorController.execute);
router.post('/', checkToken, createColorController.execute);
router.put('/:id', checkToken, updateColorController.execute);
router.delete('/:id', checkToken, hardDeleteColorController.execute);
router.patch('/:id', checkToken, softDeleteColorController.execute);

export default router;