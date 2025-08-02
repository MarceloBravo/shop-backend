import GetByIdGeneroService from '../../services/genero/GetByIdGeneroService.js';
import GeneroRepository from '../../repositories/GeneroRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un registro de género por su ID incluyendo los eliminados
 * @class GetByIdGeneroWithDeletedController
 */
class GetByIdGeneroWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de géneros
     */
    constructor(repository = null) {
        if(!repository){
            repository = new GeneroRepository();
        }
        this.service = new GetByIdGeneroService(repository);
    }

    /**
     * Ejecuta la obtención de un registro de género por su ID incluyendo los eliminados
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

export default GetByIdGeneroWithDeletedController;
