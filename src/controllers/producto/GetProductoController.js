import GetByProductoService from "../../services/producto/GetByProductoService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un producto por su ID
 * @class GetProductoController
 */
class GetProductoController {
    /**
     * Crea una instancia del controlador
     * @param {Object} service - Servicio de productos
     */
    constructor(service = new GetByProductoService()) {
        this.service = service;
    }

    /**
     * Obtiene un producto por su ID
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación
     */
    execute = async (req, res) => {
        try {
            const { id, getByQuery = false } = req.params;
            const data = await this.service.execute(id, getByQuery, true);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetProductoController;