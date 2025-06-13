import CreateRolPermisosService from '../../services/RolPermisos/CreateRolPermisosService.js';
import RolPermisosRepository from '../../repositories/RolPermisosRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear un nuevo permiso de rol
 * @class CreateRolPermisosController
 */
class CreateRolPermisosController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de permisos de rol
     */
    constructor(repository = new RolPermisosRepository()) {
        this.service = new CreateRolPermisosService(repository);
    }

    /**
     * Ejecuta la creación de un nuevo permiso de rol
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute(req.body);
            res.json({ data, mensaje: 'El registro ha sido creado exitosamente.' });
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }   
}

export default CreateRolPermisosController;