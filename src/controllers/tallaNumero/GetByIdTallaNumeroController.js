import GetByIdTallaNumeroService from '../../services/tallaNumero/GetByIdTallaNumeroService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una talla numérica por ID incluyendo registros eliminados
 * @class
 * @param {GetByIdTallaNumeroService} service - Servicio para obtener una talla numérica
 * @returns {GetByIdTallaNumeroWithDeletedController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para obtener una talla numérica por ID incluyendo registros eliminados.
 */
class GetByIdTallaNumeroWithDeletedController {
    constructor(service = new GetByIdTallaNumeroService()) {
        this.service = service;
    }

    /**
     * Obtiene una talla numérica por ID incluyendo registros eliminados.
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id);
            res.json(data);
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdTallaNumeroWithDeletedController;
