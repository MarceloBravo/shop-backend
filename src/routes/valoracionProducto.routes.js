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
import ValoracionProductoRepository from "../repositories/ValoracionProductoRepository.js";
import { checkToken } from '../shared/mw_token.js';

const router = Router();
const repository = new ValoracionProductoRepository();

const getByIdValoracionProductoController = new GetByIdValoracionProductoController(repository);
const getAllValoracionProductoController = new GetAllValoracionProductoController(repository);
const getPageValoracionProductoController = new GetPageValoracionProductoController(repository);
const getByIdValoracionProductoWithDeletedController = new GetByIdValoracionProductoWithDeletedController(repository);
const getAllValoracionProductoWithDeletedController = new GetAllValoracionProductoWithDeletedController(repository);
const getPageValoracionProductoWithDeletedController = new GetPageValoracionProductoWithDeletedController(repository);
const createValoracionProductoController = new CreateValoracionProductoController(repository);
const updateValoracionProductoController = new UpdateValoracionProductoController(repository);
const hardDeleteValoracionProductoController = new HardDeleteValoracionProductoController(repository);
const softDeleteValoracionProductoController = new SoftDeleteValoracionProductoController(repository);

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