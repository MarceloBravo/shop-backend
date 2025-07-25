import CreateProductoOrchestrator from '../../orchestrators/producto/CreateProductoOrchestrator.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear un nuevo producto
 * @class CreateProductoController
 */
class CreateProductoController {
    /**
     * Crea una instancia del controlador
     * @param {Object} orchestrator - Orquestador de productos
     */
    constructor(orchestrator = new CreateProductoOrchestrator()) {
        this.orchestrator = orchestrator;
    }

    /**
     * Crea un nuevo producto en la base de datos
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación
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