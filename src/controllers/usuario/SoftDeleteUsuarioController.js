import SoftDeleteUsuarioService from "../../services/usuario/SoftDeleteUsuarioService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar un borrado lógico de un usuario.
 */
class SoftDeleteUsuarioController {
    /**
     * @param {SoftDeleteUsuarioService} service - Servicio para realizar un borrado lógico de un usuario.
     */
    constructor(service = new SoftDeleteUsuarioService()) {
        this.service = service;
    }

    /**
     * Realiza un borrado lógico de un usuario.
     * @param {Object} req - El objeto de solicitud.
     * @param {Object} res - El objeto de respuesta.
     * @returns {Promise<void>} - Se resuelve cuando la operación se completa.
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const mensaje = result ? 'El registro ha sido borrado exitosamente.' : 'El registro no pudo ser borrado o registro inexistente';
            res.json({ code: result, mensaje });
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteUsuarioController;