import GetAllTallaNumeroService from '../../services/tallaNumero/GetAllTallaNumeroService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todas las tallas numéricas incluyendo los eliminados
 * @class GetAllTallaNumeroWithDeletedController
 */
class GetAllTallaNumeroWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tallas numéricas
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new GetAllTallaNumeroService(repository);
    }

    /**
     * Ejecuta la obtención de todas las tallas numéricas incluyendo los eliminados
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

export default GetAllTallaNumeroWithDeletedController;
