import SoftDeleteTallaNumeroService from '../../services/tallaNumero/SoftDeleteTallaNumeroService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado lógico de una talla numérica
 * @class SoftDeleteTallaNumeroController
 */
class SoftDeleteTallaNumeroController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tallas numéricas
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new SoftDeleteTallaNumeroService(repository);
    }

    /**
     * Realiza un borrado lógico de una talla numérica.
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {
                id,
                code: result ? 200 : 500, 
                mensaje: result.deleted_at ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente'
            };
            res.json(resp);
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteTallaNumeroController;