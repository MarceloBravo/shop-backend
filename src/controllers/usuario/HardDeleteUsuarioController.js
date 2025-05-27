import HardDeleteUsuarioService from '../../services/usuario/HardDeleteUsuarioService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar un borrado físico de un usuario.
 */
class HardDeleteUsuarioController {
    /**
     * @param {HardDeleteUsuarioService} service - Servicio para realizar un borrado físico de un usuario.
     */
    constructor(service = new HardDeleteUsuarioService()) {
        this.service = service;
    }

    /**
     * Realiza un borrado físico de un usuario.
     * @param {Object} req - El objeto de solicitud.
     * @param {Object} res - El objeto de respuesta.
     * @returns {Promise<void>} - Se resuelve cuando la operación se completa.
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

export default HardDeleteUsuarioController;