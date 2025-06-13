import GetAllRolService from '../../services/Rol/GetAllRolService.js';
import RolRepository from '../../repositories/RolRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todos los roles
 * @class GetAllRolController
 */
class GetAllRolController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de roles
     */
    constructor(repository = new RolRepository()) {
        this.service = new GetAllRolService(repository);
    }

    /**
     * Ejecuta la obtención de todos los roles
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute();
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllRolController;