import HardDeleteTipoDimensionesService from '../../services/tipoDimensiones/HardDeleteTipoDimensionesService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado físico de un tipo de dimensión
 * @class HardDeleteTipoDimensionesController
 */
class HardDeleteTipoDimensionesController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tipos de dimensión
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new HardDeleteTipoDimensionesService(repository);
    }

    /**
     * Maneja la petición para eliminar permanentemente un tipo de dimensione
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const resp = await this.service.execute(id);
            const mensaje = resp.result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminado o registro inexistente';
            res.json({ id, code: resp.result ? 200 : 500, mensaje });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteTipoDimensionesController;