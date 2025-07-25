import GetByIdTallaNumeroService from '../../services/tallaNumero/GetByIdTallaNumeroService.js';
import TallaNumeroRepository from '../../repositories/TallaNumeroRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una talla numérica por su ID incluyendo los eliminados
 * @class GetByIdTallaNumeroWithDeletedController
 */
class GetByIdTallaNumeroWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tallas numéricas
     */
    constructor(repository = new TallaNumeroRepository()) {
        this.service = new GetByIdTallaNumeroService(repository);
    }

    /**
     * Ejecuta la obtención de una talla numérica por su ID incluyendo los eliminados
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id, false);
            res.json(data);
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdTallaNumeroWithDeletedController;
