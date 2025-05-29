import CreateProductoOrchestrator from '../../orchestrators/producto/CreateProductoOrchestrator.js';
import { handleError } from "../../shared/functions.js";

/**
 * @class CreateProductoController
 * @description Controlador para la creación de productos
 */
class CreateProductoController {
    /**
     * @constructor
     * @description Inicializa el orquestador de creación de productos
     */
    constructor() {
        this.orchestrator = new CreateProductoOrchestrator();
    }

    /**
     * @method execute
     * @description Maneja la petición de creación de un producto
     * @param {Object} req - Objeto de petición
     * @param {Object} res - Objeto de respuesta
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const result = await this.orchestrator.createProducto(req.body);
            res.json({ result, mensaje: 'El producto ha sido registrado exitosamente.' });
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default CreateProductoController;