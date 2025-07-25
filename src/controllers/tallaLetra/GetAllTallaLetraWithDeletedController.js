import GetAllTallaLetraService from '../../services/tallaLetra/GetAllTallaLetraService.js';
import TallaLetraRepository from '../../repositories/TallaLetraRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todas las tallas letra incluyendo los eliminados
 * @class GetAllTallaLetraWithDeletedController
 */
class GetAllTallaLetraWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tallas letra
     */
    constructor(repository = new TallaLetraRepository()) {
        this.service = new GetAllTallaLetraService(repository);
    }

    /**
     * Ejecuta la obtención de todas las tallas letra incluyendo los eliminados
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute(false);
            res.json(data);
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllTallaLetraWithDeletedController;
