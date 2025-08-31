import HardDeleteTallaLetraService from '../../services/tallaLetra/HardDeleteTallaLetraService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado físico de una talla letra
 * @class HardDeleteTallaLetraController
 */
class HardDeleteTallaLetraController {
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
        this.service = new HardDeleteTallaLetraService(repository);
    }

    /**
     * Ejecuta el borrado físico de una talla letra
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            res.json({
                id,
                code: result.deleted_at ? 200 : 500,
                mensaje: result.deleted_at ? 'El registro ha sido eliminado exitosamente.' : 'No se pudo eliminar el registro.'
            });
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteTallaLetraController;
