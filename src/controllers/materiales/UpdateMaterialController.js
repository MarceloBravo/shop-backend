import UpdateMaterialService from "../../services/materiales/UpdateMaterialService.js";
import MaterialRepository from "../../repositories/MaterialRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar un material
 * @class UpdateMaterialController
 */
class UpdateMaterialController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de materiales
     */
    constructor(repository = new MaterialRepository()) {
        this.service = new UpdateMaterialService(repository);
    }

    /**
     * Ejecuta la actualización de un material
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({
                material: result.material,
                mensaje: `Material ${result.created ? 'creado' : 'actualizado'} exitosamente.`
            });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateMaterialController;