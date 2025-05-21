import HardDeleteTallaLetraService from '../../services/tallaLetra/HardDeleteTallaLetraService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para eliminar permanentemente una talla letra
 * @class
 * @param {HardDeleteTallaLetraService} service - Servicio para eliminar permanentemente una talla letra
 * @returns {HardDeleteTallaLetraController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para eliminar permanentemente una talla letra.
 */
class HardDeleteTallaLetraController {
    constructor(service = new HardDeleteTallaLetraService()) {
        this.service = service;
    }

    /**
     * Elimina permanentemente una talla letra.
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            await this.service.execute(id);
            res.json({
                id,
                mensaje: 'El registro ha sido eliminado permanentemente.'
            });
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteTallaLetraController;
