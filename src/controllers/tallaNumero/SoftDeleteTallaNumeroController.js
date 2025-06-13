import SoftDeleteTallaNumeroService from '../../services/tallaNumero/SoftDeleteTallaNumeroService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar un borrado lógico de una talla numérica
 * @class
 * @param {SoftDeleteTallaNumeroService} service - Servicio para realizar un borrado lógico
 * @returns {SoftDeleteTallaNumeroController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para realizar un borrado lógico de una talla numérica.
 */
class SoftDeleteTallaNumeroController {
    constructor(service = new SoftDeleteTallaNumeroService()) {
        this.service = service;
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
                code: result, 
                mensaje: result == 200 ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente'
            };
            res.json(resp);
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteTallaNumeroController;