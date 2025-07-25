import SoftDeleteGeneroService from "../../services/genero/SoftDeleteGeneroService.js";
import GeneroRepository from '../../repositories/GeneroRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado lógico de un registro de género
 * @class SoftDeleteGeneroController
 */
class SoftDeleteGeneroController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de géneros
     */
    constructor(repository = new GeneroRepository()) {
        this.service = new SoftDeleteGeneroService(repository);
    }

    /**
     * Ejecuta el borrado lógico de un registro de género
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {code: result, mensaje: result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente' };
            res.json(resp);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteGeneroController;