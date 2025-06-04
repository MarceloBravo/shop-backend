import CreateAtributoService from "../../services/atributo/CreateAtributoService.js";
import AtributosRepository from "../../repositories/AtributosRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear un nuevo atributo
 * @class CreateAtributoController
 */
class CreateAtributoController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de atributos
     */
    constructor(repository = new AtributosRepository()) {
        this.service = new CreateAtributoService(repository);
    }

    /**
     * Ejecuta la creación de un nuevo atributo
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {        
            const data = await this.service.execute(req.body);
            res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default CreateAtributoController;