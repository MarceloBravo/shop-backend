import GetByIdTallaLetraService from '../../services/tallaLetra/GetByIdTallaLetraService.js';
import TallaLetraRepository from '../../repositories/TallaLetraRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una talla letra por su ID incluyendo los eliminados
 * @class GetByIdTallaLetraWithDeletedController
 */
class GetByIdTallaLetraWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tallas letra
     */
    constructor(repository = new TallaLetraRepository()) {
        this.service = new GetByIdTallaLetraService(repository);
    }

    /**
     * Ejecuta la obtención de una talla letra por su ID incluyendo los eliminados
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

export default GetByIdTallaLetraWithDeletedController;
