import GetAllGeneroService from '../../services/genero/GetAllGeneroService.js';
import GeneroRepository from '../../repositories/GeneroRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todos los registros de género incluyendo los eliminados
 * @class GetAllGeneroWithDeletedController
 */
class GetAllGeneroWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de géneros
     */
    constructor(repository = new GeneroRepository()) {
        this.service = new GetAllGeneroService(repository);
    }

    /**
     * Ejecuta la obtención de todos los registros de género incluyendo los eliminados
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute(false);
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllGeneroWithDeletedController;

