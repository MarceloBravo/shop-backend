import GetPageUsuarioService from "../../services/usuario/GetPageUsuarioService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una lista paginada de usuarios.
 */
class GetPageUsuarioWithDeletedController {
    /**
     * @param {GetPageUsuarioService} service - Servicio para obtener una lista paginada de usuarios.
     */
    constructor(service = new GetPageUsuarioService()) {
        this.service = service;
    }

    /**
     * Obtiene una lista paginada de usuarios.
     * @param {Object} req - El objeto de solicitud.
     * @param {Object} res - El objeto de respuesta.
     * @returns {Promise<void>} - Se resuelve cuando la operación se completa.
     */
    execute = async (req, res) => {
        try {
            const { pag = 1, limit = 10 } = req.params;
            const result = await this.service.execute(pag, limit, false);
            res.json({ data: result });
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageUsuarioWithDeletedController;