import GetByIdColorService from '../../services/color/GetByIdColorService.js';
import ColorRepository from '../../repositories/ColorRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un color por su ID incluyendo los eliminados
 * @class GetColorWithDeletedController
 */
class GetColorWithDeletedController {
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
     * Ejecuta la obtención de un color por su ID incluyendo los eliminados
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

export default GetColorWithDeletedController;
