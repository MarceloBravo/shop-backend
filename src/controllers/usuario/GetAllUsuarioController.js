import GetAllUsuarioService from '../../services/usuario/GetAllUsuarioService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todos los usuarios
 * @class GetAllUsuarioController
 */
class GetAllUsuarioController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de usuarios
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new GetAllUsuarioService(repository);
    }

    /**
     * Ejecuta la obtención de todos los usuarios
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute();
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllUsuarioController;