import GetAllColorService from '../../services/color/GetAllColorsService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todos los colores incluyendo los eliminados
 * @class GetAllColorWithDeletedController
 */
class GetAllColorWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de colores
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new GetAllColorService(repository);
    }

    /**
     * Ejecuta la obtención de todos los colores incluyendo los eliminados
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute(false);
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }   
}

export default GetAllColorWithDeletedController;

