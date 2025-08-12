import GetByIdTallaNumeroService from '../../services/tallaNumero/GetByIdTallaNumeroService.js';
import TallaNumeroRepository from '../../repositories/TallaNumeroRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una talla numérica por su ID
 * @class GetByIdTallaNumeroWithDeletedController 
 */
class GetByIdTallaNumeroWithDeletedController  {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tallas numéricas
     */
    constructor(repository) {
        if(!repository) {
            repository = new TallaNumeroRepository()
        }
        this.service = new GetByIdTallaNumeroService(repository);
    }

    /**
     * Obtiene una talla numérica por ID incluyendo registros eliminados.
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id);
            res.json(data);
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdTallaNumeroWithDeletedController;
