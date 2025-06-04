import SoftDeleteAtributoService from "../../services/atributo/SoftDeleteAtributoService.js";
import AtributosRepository from "../../repositories/AtributosRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para eliminar lógicamente un atributo
 * @class SoftDeleteAtributoController
 */
class SoftDeleteAtributoController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de atributos
     */
    constructor(repository = new AtributosRepository()) {
        this.service = new SoftDeleteAtributoService(repository);
    }

    /**
     * Ejecuta la eliminación lógica de un atributo
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {
                code: result, 
                mensaje: result ? 'El registro ha sido borrado exitosamente.' : 'El registro no pudo ser borrado o registro inexistente'
            };
            res.json(resp);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteAtributoController;