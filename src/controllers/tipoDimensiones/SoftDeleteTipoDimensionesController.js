import SoftDeleteTipoDimensionesService from "../../services/tipoDimensiones/SoftDeleteTipoDimensionesService.js";
import TipoDimensionesRepository from '../../repositories/TipoDimensionesRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado lógico de un tipo de dimensión
 * @class SoftDeleteTipoDimensionesController
 */
class SoftDeleteTipoDimensionesController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tipos de dimensión
     */
    constructor(repository = null) {
        if (!repository) {
            repository = new TipoDimensionesRepository()
        }
        this.service = new SoftDeleteTipoDimensionesService(repository);
    }

    /**
     * Realiza un borrado lógico de un tipo de dimensión (tipo de medida).
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {
                code: result,
                mensaje: result == 200 ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente'
            };
            res.json(resp);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteTipoDimensionesController;