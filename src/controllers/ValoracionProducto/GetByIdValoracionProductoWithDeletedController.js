import GetByIdValoracionProductoService from "../../services/ValoracionProducto/GetByIdValoracionProductoService.js";
import ValoracionProductoRepository from "../../repositories/ValoracionProductoRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una valoración de producto por su ID, incluyendo las eliminadas
 * @class GetByIdValoracionProductoWithDeletedController
 */
class GetByIdValoracionProductoWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de valoraciones de productos
     */
    constructor(repository = null) {
        if(!repository) {
            repository = new ValoracionProductoRepository();
        }
        this.service = new GetByIdValoracionProductoService(repository);
    }

    /**
     * Ejecuta la obtención de una valoración de producto por su ID, incluyendo las eliminadas
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id, false);
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdValoracionProductoWithDeletedController;