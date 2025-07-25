import GetAllTallaNumeroService from '../../services/tallaNumero/GetAllTallaNumeroService.js';
import TallaNumeroRepository from '../../repositories/TallaNumeroRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todas las tallas numéricas
 * @class GetAllTallaNumeroController
 */
class GetAllTallaNumeroController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tallas numéricas
     */
    constructor(repository = new TallaNumeroRepository()) {
        this.service = new GetAllTallaNumeroService(repository);
    }

    /**
     * Ejecuta la obtención de todas las tallas numéricas
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute();
            res.json(data);
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllTallaNumeroController;

