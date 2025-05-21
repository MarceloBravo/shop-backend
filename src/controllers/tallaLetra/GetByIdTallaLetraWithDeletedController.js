import GetByIdTallaLetraService from '../../services/tallaLetra/GetByIdTallaLetraService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una talla letra por ID incluyendo registros eliminados
 * @class GetByIdTallaLetraWithDeletedController
 * @param {GetByIdTallaLetraService} service - Servicio para obtener una talla letra
 * @returns {GetByIdTallaLetraWithDeletedController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para obtener una talla letra por ID incluyendo registros eliminados.
 */
class GetByIdTallaLetraWithDeletedController {
    constructor(service = new GetByIdTallaLetraService()) {
        this.service = service;
    }

    /**
     * Obtiene una talla letra por ID incluyendo registros eliminados.
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id, false);
            res.json(data);
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdTallaLetraWithDeletedController;
