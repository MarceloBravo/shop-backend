import SoftDeleteRolService from "../../services/Rol/SoftDeleteRolService.js";
import { handleError } from "../../shared/functions.js";
import RolRepository from "../../repositories/RolRepository.js";

/**
 * Controlador para realizar borrado lógico de un rol
 * @class SoftDeleteRolController
 */
class SoftDeleteRolController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de roles
     */
    constructor(repository = new RolRepository()) {
        this.service = new SoftDeleteRolService(repository);
    }

    /**
     * Ejecuta el borrado lógico de un rol
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {code: result, mensaje: result ? 'El registro ha sido borrado exitosamente.' : 'El registro no pudo ser borrado o registro inexistente'};
            res.json(resp);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteRolController;