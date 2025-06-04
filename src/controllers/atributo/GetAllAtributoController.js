import GetAllAtributoService from '../../services/atributo/GetAllAtributoService.js';
import AtributosRepository from "../../repositories/AtributosRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todos los atributos
 * @class GetAllAtributoController
 */
class GetAllAtributoController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de atributos
     */
    constructor(repository = new AtributosRepository()) {
        this.service = new GetAllAtributoService(repository);
    }

    /**
     * Ejecuta la obtención de todos los atributos
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

export default GetAllAtributoController;

