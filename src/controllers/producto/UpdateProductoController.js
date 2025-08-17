import UpdateProductoOrchestrator from "../../orchestrators/producto/UpdateProductoOrchestrator.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar un producto
 * @class UpdateProductoController
 */
class UpdateProductoController {
    /**
     * Crea una instancia del controlador
     * @param {Object} orchestrator - Orquestador de productos
     */
    constructor(orchestrator = null) {
        if(!orchestrator) {
            orchestrator = new UpdateProductoOrchestrator();
        }
        this.orchestrator = orchestrator;
    }

    /**
     * Actualiza un producto en la base de datos
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.orchestrator.updateProducto(id, req.body);
            res.json({data: result, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateProductoController;