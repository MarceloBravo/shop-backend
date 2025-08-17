import GetByProductoService from "../../services/producto/GetByProductoService.js";
import ProductoRepository from '../../repositories/ProductoRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * @class GetProductoByIdWithDeletedController
 * @description Controlador para la obtención de un producto por ID
 */
class GetProductoByIdWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de productos
     */
    constructor(repository = null) {
        if(!repository){
            repository = new ProductoRepository()
        }
        this.service = new GetByProductoService(repository);
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

export default GetProductoByIdWithDeletedController;