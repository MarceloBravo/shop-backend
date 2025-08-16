import GetAllValoracionProductoService from '../../services/ValoracionProducto/GetAllValoracionProductoService.js';
import ValoracionProductoRepository from "../../repositories/ValoracionProductoRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todas las valoraciones de productos
 * @class GetAllValoracionProductoController
 */
class GetAllValoracionProductoController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de valoraciones de productos
     */
    constructor(repository = null) {
        if(!repository) {
            repository = new ValoracionProductoRepository();
        }
        this.service = new GetAllValoracionProductoService(repository);
    }

    /**
     * Ejecuta la obtención de todas las valoraciones de productos
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute();
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllValoracionProductoController;