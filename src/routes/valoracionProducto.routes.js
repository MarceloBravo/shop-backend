import { Router } from 'express';
import getValoracionProductoController from '../controllers/ValoracionProducto/GetValoracionProductoController.js';
import getAllValoracionProductoController from '../controllers/ValoracionProducto/GetAllValoracionProductoController.js';
import getPageValoracionProductoController from '../controllers/ValoracionProducto/GetPageValoracionProductoController.js';
import createValoracionProductoController from '../controllers/ValoracionProducto/CreateValoracionProductoController.js';
import updateValoracionProductoController from '../controllers/ValoracionProducto/UpdateValoracionProductoController.js';
import deleteValoracionProductoController from '../controllers/ValoracionProducto/DeleteValoracionProductoController.js';
import softDeleteValoracionProductoController from '../controllers/ValoracionProducto/SoftDeleteValoracionProductoController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', getValoracionProductoController);
router.get('', getAllValoracionProductoController);
router.get('/page/:pag/:limit?', getPageValoracionProductoController);
router.post('', checkToken, createValoracionProductoController);
router.put('/:id', checkToken, updateValoracionProductoController);
router.delete('/:id', checkToken, deleteValoracionProductoController);
router.delete('/borrar/:id', checkToken, softDeleteValoracionProductoController);

export default router;