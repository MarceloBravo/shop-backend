import CreateUsuarioService from '../../services/usuario/CreateUsuarioService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear un nuevo usuario.
 */
class CreateUsuarioController {
    /**
     * @param {CreateUsuarioService} service - Servicio para crear un nuevo usuario.
     */
    constructor(service = new CreateUsuarioService()) {
        this.service = service;
    }

    /**
     * Crea un nuevo usuario.
     * @param {Object} req - El objeto de solicitud.
     * @param {Object} res - El objeto de respuesta.
     * @returns {Promise<void>} - Se resuelve cuando la operación se completa.
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute(req.body);
            res.json({ data, mensaje: 'El registro ha sido creado exitosamente.' });
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default CreateUsuarioController;