import SoftDeleteMaterialService from "../../services/materiales/SoftDeleteMaterialService.js";
import MaterialRepository from "../../repositories/MaterialRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para eliminar lógicamente un material
 * @class SoftDeleteMaterialController
 */
class SoftDeleteMaterialController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de materiales
     */
    constructor(repository = new MaterialRepository()) {
        this.service = new SoftDeleteMaterialService(repository);
    }

    /**
     * Ejecuta la eliminación lógica de un material
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {
                code: result,
                mensaje: result ? 'El material ha sido eliminado exitosamente.' : 'El material no pudo ser eliminado o no existe'
            };
            res.json(resp);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteMaterialController;