import UpdateUsuarioService from '../../services/usuario/UpdateUsuarioService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar un usuario
 * @class UpdateUsuarioController
 */
class UpdateUsuarioController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de usuarios
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new UpdateUsuarioService(repository);
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
            res.json({ data: result.data, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.` });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateUsuarioController;