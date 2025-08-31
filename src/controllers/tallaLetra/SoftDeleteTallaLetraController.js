import SoftDeleteTallaLetraService from '../../services/tallaLetra/SoftDeleteTallaLetraService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado lógico de una talla letra
 * @class SoftDeleteTallaLetraController
 */
class SoftDeleteTallaLetraController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tallas letra
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new SoftDeleteTallaLetraService(repository);
    }

    /**
     * Ejecuta el borrado lógico de una talla letra
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {
                id,
                code: result ? 200 : 500, 
                mensaje: result.deleted_at ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente'
            };
            res.json(resp);
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteTallaLetraController;