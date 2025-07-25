import { Router } from 'express';
import GetProductoWithDeletedController from '../controllers/producto/GetProductoByIdWithDeletedController.js';
import GetAllProductoWithDeletedController from '../controllers/producto/GetAllProductoWithDeletedController.js';
import GetPageProductoWithDeletedController from '../controllers/producto/GetPageProductoWithDeletedController.js';

import GetProductoController from '../controllers/producto/GetProductoByIdController.js';
import GetAllProductoController from '../controllers/producto/GetAllProductoController.js';
import GetPageProductoController from '../controllers/producto/GetPageProductoController.js';
import CreateProductoController from '../controllers/producto/CreateProductoController.js';
import UpdateProductoController from '../controllers/producto/UpdateProductoController.js';
import HardDeleteProductoController from '../controllers/producto/HardDeleteProductoController.js';
import SoftDeleteProductoController from '../controllers/producto/SoftDeleteProductoController.js';
import { checkToken } from '../shared/mw_token.js';

const router = Router();

// Instanciar los controladores
const getProductoWithDeletedController = new GetProductoWithDeletedController();
const getAllProductoWithDeletedController = new GetAllProductoWithDeletedController();
const getPageProductoWithDeletedController = new GetPageProductoWithDeletedController();

const getProductoController = new GetProductoController();
const getAllProductoController = new GetAllProductoController();
const getPageProductoController = new GetPageProductoController();
const createProductoController = new CreateProductoController();
const updateProductoController = new UpdateProductoController();
const hardDeleteProductoController = new HardDeleteProductoController();
const softDeleteProductoController = new SoftDeleteProductoController();

// Definir las rutas
router.get('/deleted', checkToken, getAllProductoWithDeletedController.execute);
router.get('/deleted/:id', checkToken, getProductoWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?/:filter?', checkToken, getPageProductoWithDeletedController.execute);

router.get('', getAllProductoController.execute);
router.get('/:id', getProductoController.execute);
router.get('/page/:pag/:limit?/:filter?', getPageProductoController.execute);
router.post('', checkToken, createProductoController.execute);
router.put('/:id', checkToken, updateProductoController.execute);
router.delete('/:id', checkToken, hardDeleteProductoController.execute);
router.patch('/:id', checkToken, softDeleteProductoController.execute);

export default router;