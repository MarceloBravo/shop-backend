import UpdateProductoOrchestrator from "../../orchestrators/producto/UpdateProductoOrchestrator.js";
import { handleError } from "../../shared/functions.js";

/**
 * @class UpdateProductoController
 * @description Controlador para la actualización de productos
 */
class UpdateProductoController {
    /**
     * @constructor
     * @description Inicializa el orquestador de actualización de productos
     */
    constructor() {
        this.orchestrator = new UpdateProductoOrchestrator();
    }

    /**
     * @method execute
     * @description Maneja la petición de actualización de un producto
     * @param {Object} req - Objeto de petición
     * @param {Object} res - Objeto de respuesta
     * @returns {Promise<void>}
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