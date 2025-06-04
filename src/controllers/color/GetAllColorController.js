import GetAllColorService from '../../services/color/GetAllColorsService.js';
import ColorRepository from '../../repositories/ColorRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todos los colores
 * @class GetAllColorController
 */
class GetAllColorController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de colores
     */
    constructor(repository = new ColorRepository()) {
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

