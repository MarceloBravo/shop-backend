import GetByIdUsuarioService from "../../services/usuario/GetByIdUsuarioService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un usuario por ID.
 */
class GetByIdUsuarioWithDeletedController {
    /**
     * @param {GetByIdUsuarioService} service - Servicio para obtener un usuario por ID.
     */
    constructor(service = new GetByIdUsuarioService()) {
        this.service = service;
    }

    /**
     * Obtiene un usuario por ID.
     * @param {Object} req - El objeto de solicitud.
     * @param {Object} res - El objeto de respuesta.
     * @returns {Promise<void>} - Se resuelve cuando la operación se completa.
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id, false);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdUsuarioWithDeletedController;