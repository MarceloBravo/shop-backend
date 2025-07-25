import HardDeleteMaterialService from '../../services/materiales/HardDeleteMaterialService.js';
import MaterialRepository from "../../repositories/MaterialRepository.js";
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
    constructor(repository = new MaterialRepository()) {
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
            const mensaje = result ? 'El material ha sido eliminado exitosamente.' : 'El material no pudo ser eliminado o no existe';
            res.json({ id, code: result ? 200 : 500, mensaje });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteMaterialController;