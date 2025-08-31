import GetAllColorService from '../../services/color/GetAllColorsService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todos los colores
 * @class GetAllColorController
 */
class GetAllColorController {
    /**
     * Crea una instancia del controlador
     * @param {GetAllColorService} service - Servicio para obtener todos los colores
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
     * Ejecuta la obtención de todos los colores
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

export default GetAllColorController;

