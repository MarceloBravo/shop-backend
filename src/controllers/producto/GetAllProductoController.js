import GetAllProductoService from '../../services/producto/GetAllProductoService.js';
import ProductoRepository from '../../repositories/ProductoRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todos los productos
 * @class GetAllProductoController
 */
class GetAllProductoController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de productos
     */
    constructor(repository = new ProductoRepository()) {
        this.service = new GetAllProductoService(repository);
    }

    /**
     * Obtiene todos los productos de la base de datos
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación
     */
    execute = async (req, res) => {
        try {
            const { filter = {} } = req.params;
            const data = await this.service.execute(true, filter);
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllProductoController;