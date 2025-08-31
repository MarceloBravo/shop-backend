import GetByIdValoracionProductoService from "../../services/ValoracionProducto/GetByIdValoracionProductoService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una valoración de producto por su ID
 * @class GetByIdValoracionProductoController
 */
class GetByIdValoracionProductoController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de valoraciones de productos
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new GetByIdValoracionProductoService(repository);
    }

    /**
     * Ejecuta la obtención de una valoración de producto por su ID
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id);
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdValoracionProductoController;