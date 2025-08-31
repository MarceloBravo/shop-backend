import GetByIdGeneroService from '../../services/genero/GetByIdGeneroService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un registro de género por su ID
 * @class GetByIdGeneroController
 */
class GetByIdGeneroController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de géneros
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new GetByIdGeneroService(repository);
    }

    /**
     * Ejecuta la obtención de un registro de género por su ID
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

export default GetByIdGeneroController;
