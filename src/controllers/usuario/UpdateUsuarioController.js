import UpdateUsuarioService from '../../services/usuario/UpdateUsuarioService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar un usuario.
 */
class UpdateUsuarioController {
    /**
     * @param {UpdateUsuarioService} service - Servicio para actualizar un usuario.
     */
    constructor(service = new UpdateUsuarioService()) {
        this.service = service;
    }

    /**
     * Actualiza un usuario.
     * @param {Object} req - El objeto de solicitud.
     * @param {Object} res - El objeto de respuesta.
     * @returns {Promise<void>} - Se resuelve cuando la operación se completa.
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({ mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.` });
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateUsuarioController;