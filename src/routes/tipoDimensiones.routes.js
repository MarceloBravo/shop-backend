import { Router } from 'express';
import GetByIdTipoDimensionesController from '../controllers/tipoDimensiones/GetByIdTipoDimensionesController.js';
import GetAllTipoDimensionesController from '../controllers/tipoDimensiones/GetAllTipoDimensionesController.js';
import GetPageTipoDimensionesController from '../controllers/tipoDimensiones/GetPageTipoDimensionesController.js';
import GetByIdTipoDimensionesWithDeletedController from '../controllers/tipoDimensiones/GetByIdTipoDimensionesWithDeletedController.js';
import GetAllTipoDimensionesWithDeletedController from '../controllers/tipoDimensiones/GetAllTipoDimensionesWithDeletedController.js';
import GetPageTipoDimensionesWithDeletedController from '../controllers/tipoDimensiones/GetPageTipoDimensionesWithDeletedController.js';
import CreateTipoDimensionesController from '../controllers/tipoDimensiones/CreateTipoDimensionesController.js';
import UpdateTipoDimensionesController from '../controllers/tipoDimensiones/UpdateTipoDimensionesController.js';
import HardDeleteTipoDimensionesController from '../controllers/tipoDimensiones/HardDeleteTipoDimensionesController.js';
import SoftDeleteTipoDimensionesController from '../controllers/tipoDimensiones/SoftDeleteTipoDimensionesController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

// Instanciar controladores
const getByIdController = new GetByIdTipoDimensionesController();
const getAllController = new GetAllTipoDimensionesController();
const getPageController = new GetPageTipoDimensionesController();
const getByIdWithDeletedController = new GetByIdTipoDimensionesWithDeletedController();
const getAllWithDeletedController = new GetAllTipoDimensionesWithDeletedController();
const getPageWithDeletedController = new GetPageTipoDimensionesWithDeletedController();
const createController = new CreateTipoDimensionesController();
const updateController = new UpdateTipoDimensionesController();
const hardDeleteController = new HardDeleteTipoDimensionesController();
const softDeleteController = new SoftDeleteTipoDimensionesController();

// Rutas para registros eliminados (soft deleted)
router.get('/deleted', checkToken, getAllWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getByIdWithDeletedController.execute);
router.get('/deleted/page/:page/:limit?', checkToken, getPageWithDeletedController.execute);

// Rutas públicas
router.get('/', getAllController.execute);
router.get('/:id', getByIdController.execute);
router.get('/page/:page/:limit?', getPageController.execute);

// Rutas protegidas
router.post('/', checkToken, createController.execute);
router.put('/:id', checkToken, updateController.execute);
router.delete('/:id', checkToken, hardDeleteController.execute);
router.patch('/:id', checkToken, softDeleteController.execute);


export default router;