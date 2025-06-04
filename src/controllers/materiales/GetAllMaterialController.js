import GetAllMaterialService from '../../services/materiales/GetAllMaterialService.js';
import MaterialRepository from "../../repositories/MaterialRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todos los materiales
 * @class GetAllMaterialController
 */
class GetAllMaterialController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de materiales
     */
    constructor(repository = new MaterialRepository()) {
        this.service = new GetAllMaterialService(repository);
    }

    /**
     * Ejecuta la obtención de todos los materiales
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

export default GetAllMaterialController;

