import HardDeleteMaterialService from '../../services/materiales/HardDeleteMaterialService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para eliminar permanentemente un material
 * @class HardDeleteMaterialController
 */
class HardDeleteMaterialController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de materiales
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new HardDeleteMaterialService(repository);
    }

    /**
     * Ejecuta la eliminación permanente de un material
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const { result } = await this.service.execute(id);
            const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no pudo ser eliminado o no existe';
            res.json({ id, code: result ? 200 : 500, mensaje });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteMaterialController;