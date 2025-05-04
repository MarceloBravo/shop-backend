import { Router } from 'express';
import getProductoController from '../controllers/producto/GetProductoController.js';
import getAllProductoController from '../controllers/producto/GetAllProductoController.js';
import getPageProductoController from '../controllers/producto/GetPageProductoController.js';
import createProductoController from '../controllers/producto/CreateProductoController.js';
import updateProductoController from '../controllers/producto/UpdateProductoController.js';
import deleteProductoController from '../controllers/producto/DeleteProductoController.js';
import softDeleteProductoController from '../controllers/producto/SoftDeleteProductoController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

router.get('/:id', getProductoController);
router.get('', getAllProductoController);
router.get('/page/:pag/:limit?', getPageProductoController);
router.post('', checkToken, createProductoController);
router.put('/:id', checkToken, updateProductoController);
router.delete('/:id', checkToken, deleteProductoController);
router.delete('/borrar/:id', checkToken, softDeleteProductoController);

export default router;