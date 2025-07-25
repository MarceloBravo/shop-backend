import GetAllProductoService from '../../services/producto/GetAllProductoService.js';
import ProductoRepository from '../../repositories/ProductoRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * @class GetAllProductoWithDeletedController
 * @description Controlador para la obtención de todos los productos
 */
class GetAllProductoWithDeletedController {
    /**
     * @constructor
     * @description Inicializa el servicio de obtención de todos los productos
     * @param {Object} repository - Repositorio de productos
     */
    constructor(repository = new ProductoRepository()) {
        this.service = new GetAllProductoService(repository);
    }

    /**
     * @method execute
     * @description Maneja la petición de obtención de todos los productos
     * @param {Object} req - Objeto de petición
     * @param {Object} res - Objeto de respuesta
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { filter = {} } = req.params;
            const data = await this.service.execute(false, filter);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllProductoWithDeletedController;