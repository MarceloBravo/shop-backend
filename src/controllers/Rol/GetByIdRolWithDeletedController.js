import GetByIdRolService from "../../services/Rol/GetByIdRolService.js";
import RolRepository from '../../repositories/RolRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un rol por su ID incluyendo los eliminados
 * @class GetByIdRolWithDeletedController
 */
class GetByIdRolWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de roles
     */
    constructor(repository = new RolRepository()) {
        this.service = new GetByIdRolService(repository);
    }

    /**
     * Ejecuta la obtención de un rol por su ID incluyendo los eliminados
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id, false);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdRolWithDeletedController;