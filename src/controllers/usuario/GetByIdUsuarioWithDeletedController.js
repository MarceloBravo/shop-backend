import GetByIdUsuarioService from '../../services/usuario/GetByIdUsuarioService.js';
import UsuarioRepository from "../../repositories/UsuarioRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un usuario por su ID incluyendo los eliminados
 * @class GetByIdUsuarioWithDeletedController
 */
class GetByIdUsuarioWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de usuarios
     */
    constructor(repository = new UsuarioRepository()) {
        this.service = new GetByIdUsuarioService(repository);
    }

    /**
     * Ejecuta la obtención de un usuario por su ID incluyendo los eliminados
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

export default GetByIdUsuarioWithDeletedController;