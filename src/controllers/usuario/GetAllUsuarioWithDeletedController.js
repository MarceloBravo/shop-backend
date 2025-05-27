import GetAllUsuarioService from '../../services/usuario/GetAllUsuarioService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todos los usuarios.
 */
class GetAllUsuarioWithDeletedController {
    /**
     * @param {GetAllUsuarioService} service - Servicio para obtener todos los usuarios.
     */
    constructor(service = new GetAllUsuarioService()) {
        this.service = service;
    }

    /**
     * Obtiene todos los usuarios.
     * @param {Object} req - El objeto de solicitud.
     * @param {Object} res - El objeto de respuesta.
     * @returns {Promise<void>} - Se resuelve cuando la operación se completa.
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute(false);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllUsuarioWithDeletedController;