import GetByIdUsuarioService from '../../services/usuario/GetByIdUsuarioService.js';
import UsuarioRepository from "../../repositories/UsuarioRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un usuario por su ID
 * @class GetByIdUsuarioController
 */
class GetByIdUsuarioController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de usuarios
     */
    constructor(repository = null) {
        if (!repository) {
            repository = new UsuarioRepository();
        }   
        this.service = new GetByIdUsuarioService(repository);
    }

    /**
     * Ejecuta la obtención de un usuario por su ID
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id);
            res.json(data ? { data } : {code: 404, mensaje: 'El registro no existe.' });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdUsuarioController;