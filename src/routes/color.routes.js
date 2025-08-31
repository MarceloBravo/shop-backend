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
import ColorRepository from "../repositories/ColorRepository.js";
import { checkToken } from '../shared/mw_token.js';

const router = Router();
const repository = new ColorRepository();

const getColorController = new GetColorController(repository)
const getAllColorController = new GetAllColorController(repository)
const getPageColorController = new GetPageColorController(repository)
const createColorController = new CreateColorController(repository)
const updateColorController = new UpdateColorController(repository)
const hardDeleteColorController = new HardDeleteColorController(repository)
const softDeleteColorController = new SoftDeleteColorController(repository)
const getColorWithDeletedController = new GetColorWithDeletedController(repository)
const getAllColorWithDeletedController = new GetAllColorWithDeletedController(repository)
const getPageColorWithDeletedController = new GetPageColorWithDeletedController(repository)


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