import { Router } from 'express';
import GetByIdValoracionProductoController from '../controllers/ValoracionProducto/GetByIdValoracionProductoController.js';
import GetAllValoracionProductoController from '../controllers/ValoracionProducto/GetAllValoracionProductoController.js';
import GetPageValoracionProductoController from '../controllers/ValoracionProducto/GetPageValoracionProductoController.js';
import GetByIdValoracionProductoWithDeletedController from '../controllers/ValoracionProducto/GetByIdValoracionProductoWithDeletedController.js';
import GetAllValoracionProductoWithDeletedController from '../controllers/ValoracionProducto/GetAllValoracionProductoWithDeletedController.js';
import GetPageValoracionProductoWithDeletedController from '../controllers/ValoracionProducto/GetPageValoracionProductoWithDeletedController.js';
import CreateValoracionProductoController from '../controllers/ValoracionProducto/CreateValoracionProductoController.js';
import UpdateValoracionProductoController from '../controllers/ValoracionProducto/UpdateValoracionProductoController.js';
import HardDeleteValoracionProductoController from '../controllers/ValoracionProducto/HardDeleteValoracionProductoController.js';
import SoftDeleteValoracionProductoController from '../controllers/ValoracionProducto/SoftDeleteValoracionProductoController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

const getByIdValoracionProductoController = new GetByIdValoracionProductoController();
const getAllValoracionProductoController = new GetAllValoracionProductoController();
const getPageValoracionProductoController = new GetPageValoracionProductoController();
const getByIdValoracionProductoWithDeletedController = new GetByIdValoracionProductoWithDeletedController();
const getAllValoracionProductoWithDeletedController = new GetAllValoracionProductoWithDeletedController();
const getPageValoracionProductoWithDeletedController = new GetPageValoracionProductoWithDeletedController();
const createValoracionProductoController = new CreateValoracionProductoController();
const updateValoracionProductoController = new UpdateValoracionProductoController();
const hardDeleteValoracionProductoController = new HardDeleteValoracionProductoController();
const softDeleteValoracionProductoController = new SoftDeleteValoracionProductoController();

router.get('/deleted', checkToken, getAllValoracionProductoWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getByIdValoracionProductoWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', checkToken, getPageValoracionProductoWithDeletedController.execute);

router.get('', getAllValoracionProductoController.execute);
router.get('/:id', getByIdValoracionProductoController.execute);
router.get('/page/:pag/:limit?', getPageValoracionProductoController.execute);
router.post('', checkToken, createValoracionProductoController.execute);
router.put('/:id', checkToken, updateValoracionProductoController.execute);
router.delete('/:id', checkToken, hardDeleteValoracionProductoController.execute);
router.patch('/:id', checkToken, softDeleteValoracionProductoController.execute);

export default router;