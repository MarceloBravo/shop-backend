import SoftDeleteUsuarioService from "../../services/usuario/SoftDeleteUsuarioService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado lógico de un usuario
 * @class SoftDeleteUsuarioController
 */
class SoftDeleteUsuarioController {
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
        this.service = new SoftDeleteUsuarioService(repository);
    }

    /**
     * Marca un registro de usuario como eliminado en la base de datos
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = { code: result, mensaje: result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente' };
            res.json(resp);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteUsuarioController;