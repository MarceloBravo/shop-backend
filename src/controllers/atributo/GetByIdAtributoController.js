import GetByIdAtributoService from '../../services/atributo/GetByIdAtributoService.js';
import AtributosRepository from "../../repositories/AtributosRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un atributo por su ID
 * @class GetByIdAtributoController
 */
class GetByIdAtributoController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de atributos
     */
    constructor(repository = new AtributosRepository()) {
        this.service = new GetByIdAtributoService(repository);
    }

    /**
     * Ejecuta la obtención de un atributo por su ID
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

export default GetByIdAtributoController;
