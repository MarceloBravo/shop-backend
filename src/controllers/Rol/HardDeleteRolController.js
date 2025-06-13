import HardDeleteRolService from '../../services/Rol/HardDeleteRolService.js';
import { handleError } from "../../shared/functions.js";
import RolRepository from '../../repositories/RolRepository.js';

/**
 * Controlador para realizar borrado físico de un rol
 * @class HardDeleteRolController
 */
class HardDeleteRolController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de roles
     */
    constructor(repository = new RolRepository()) {
        this.service = new HardDeleteRolService(repository);
    }

    /**
     * Ejecuta el borrado físico de un rol
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no pudo ser eliminado o registro inexistente';
            res.json({ id, code: result ? 200 : 500, mensaje });
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteRolController;