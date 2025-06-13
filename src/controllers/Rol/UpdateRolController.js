import UpdateRolService from "../../services/Rol/UpdateRolService.js";
import RolRepository from '../../repositories/RolRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar un rol
 * @class UpdateRolController
 */
class UpdateRolController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de roles
     */
    constructor(repository = new RolRepository()) {
        this.service = new UpdateRolService(repository);
    }

    /**
     * Ejecuta la actualización de un rol
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({rol: result.data, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`});
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateRolController;