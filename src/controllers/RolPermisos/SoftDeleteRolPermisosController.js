import SoftDeleteRolPermisosService from "../../services/RolPermisos/SoftDeleteRolPermisosService.js";
import RolPermisosRepository from '../../repositories/RolPermisosRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado lógico de un permiso de rol
 * @class SoftDeleteRolPermisosController
 */
class SoftDeleteRolPermisosController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de permisos de rol
     */
    constructor(repository = new RolPermisosRepository()) {
        this.service = new SoftDeleteRolPermisosService(repository);
    }

    /**
     * Ejecuta el borrado lógico de un permiso de rol
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

export default SoftDeleteRolPermisosController;