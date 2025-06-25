import GetByIdColorService from '../../services/color/GetByIdColorService.js';
import ColorRepository from '../../repositories/ColorRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un color por su ID
 * @class GetColorController
 */
class GetColorController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de colores
     */
    constructor(repository = null) {
        if(!repository){
            repository = new ColorRepository();
        }
        this.service = new GetByIdColorService(repository);
    }

    /**
     * Ejecuta la obtención de un color por su ID
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id);
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetColorController;
