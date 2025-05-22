import HardDeleteTipoDimensionesService from '../../services/tipoDimensiones/HardDeleteTipoDimensionesService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para eliminar permanentemente un tipo de dimensión
 * @class
 * @param {HardDeleteTallaNumeroService} service - Servicio para eliminar permanentemente una talla numérica
 * @returns {HardDeleteTallaNumeroController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para eliminar permanentemente una talla numérica.
 */
class HardDeleteTipoDimensionesController {
    constructor(service = new HardDeleteTipoDimensionesService()) {
        this.service = service;
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
            const result = await this.service.execute(id);
            const mensaje = result.result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminado o registro inexistente';  
            res.json({ id: result.id, code: result.result ? 200 : 500, mensaje });
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteTipoDimensionesController;