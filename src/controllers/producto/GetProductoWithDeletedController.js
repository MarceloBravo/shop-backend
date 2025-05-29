import GetByProductoService from "../../services/producto/GetByProductoService.js";
import { handleError } from "../../shared/functions.js";

/**
 * @class GetProductoWithDeletedController
 * @description Controlador para la obtención de un producto por ID
 */
class GetProductoWithDeletedController {
    /**
     * @constructor
     * @description Inicializa el servicio de obtención de producto por ID
     */
    constructor() {
        this.service = new GetByProductoService();
    }

    /**
     * @method execute
     * @description Maneja la petición de obtención de un producto por ID
     * @param {Object} req - Objeto de petición
     * @param {Object} res - Objeto de respuesta
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id, getByQuery = false } = req.params;
            const data = await this.service.execute(id, getByQuery, false);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetProductoWithDeletedController;