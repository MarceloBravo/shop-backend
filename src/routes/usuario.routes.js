import { Router } from 'express';
import GetByIdUsuarioController from '../controllers/usuario/GetByIdUsuarioController.js';
import GetAllUsuarioController from '../controllers/usuario/GetAllUsuarioController.js';
import GetPageUsuarioController from '../controllers/usuario/GetPageUsuarioController.js';
import GetByIdUsuarioWithDeletedController from '../controllers/usuario/GetByIdUsuarioWithDeletedController.js';
import GetAllUsuarioWithDeletedController from '../controllers/usuario/GetAllUsuarioWithDeletedController.js';
import GetPageUsuarioWithDeletedController from '../controllers/usuario/GetPageUsuarioWithDeletedController.js';
import CreateUsuarioController from '../controllers/usuario/CreateUsuarioController.js';
import UpdateUsuarioController from '../controllers/usuario/UpdateUsuarioController.js';
import HardDeleteUsuarioController from '../controllers/usuario/HardDeleteUsuarioController.js';
import SoftDeleteUsuarioController from '../controllers/usuario/SoftDeleteUsuarioController.js';
import UsuarioRepository from "../repositories/UsuarioRepository.js";

import { checkToken } from '../shared/mw_token.js';

const router = Router();
const repository = new UsuarioRepository();

// Instanciar los controladores
const getByIdUsuarioWithDeletedController = new GetByIdUsuarioWithDeletedController(repository);
const getAllUsuarioWithDeletedController = new GetAllUsuarioWithDeletedController(repository);
const getPageUsuarioWithDeletedController = new GetPageUsuarioWithDeletedController(repository);
const getByIdUsuarioController = new GetByIdUsuarioController(repository);
const getAllUsuarioController = new GetAllUsuarioController(repository);
const getPageUsuarioController = new GetPageUsuarioController(repository);
const createUsuarioController = new CreateUsuarioController(repository);
const updateUsuarioController = new UpdateUsuarioController(repository);
const hardDeleteUsuarioController = new HardDeleteUsuarioController(repository);
const softDeleteUsuarioController = new SoftDeleteUsuarioController(repository);

// Definir las rutas
router.get('/deleted/', getAllUsuarioWithDeletedController.execute);
router.get('/deleted/:id', getByIdUsuarioWithDeletedController.execute);
router.get('/deleted/page/:pag/:limit?', getPageUsuarioWithDeletedController.execute);

router.get('/', getAllUsuarioController.execute);
router.get('/:id', getByIdUsuarioController.execute);
router.get('/page/:pag/:limit?', getPageUsuarioController.execute);
router.post('/', checkToken, createUsuarioController.execute);
router.put('/:id', checkToken, updateUsuarioController.execute);
router.delete('/:id', checkToken, hardDeleteUsuarioController.execute);
router.patch('/:id', checkToken, softDeleteUsuarioController.execute);

export default router;