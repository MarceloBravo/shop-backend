import UpdateMaterialService from "../../services/materiales/UpdateMaterialService.js";
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
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
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
                material: result.data,
                mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`
            });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateMaterialController;