import GetAllColorService from '../../services/color/GetAllColorsService.js';
import ColorRepository from '../../repositories/ColorRepository.js';
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
            repository = new ColorRepository();
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

