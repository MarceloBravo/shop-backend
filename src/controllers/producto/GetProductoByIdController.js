import GetByProductoService from "../../services/producto/GetByProductoService.js";
import ProductoRepository from '../../repositories/ProductoRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un producto por su ID
 * @class GetProductoByIdController
 */
class GetProductoByIdController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de productos
     */
    constructor(repository = new ProductoRepository()) {
        this.service = new GetByProductoService(repository);
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
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetProductoByIdController;