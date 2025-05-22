import GetByIdTipoDimensionesService from "../../services/tipoDimensiones/GetByIdTipoDimensionesService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador encargado de obtener un tipo de dimensión por ID
 * @class
 * @param {GetByIdTipoDimensionesWithDeletedController} service - Servicio para obtener un tipo de dimensión
 * @returns {GetByIdTipoDimensionesController} - Instancia del controlador
 */
class GetByIdTipoDimensionesWithDeletedController {
    constructor(service = new GetByIdTipoDimensionesService()) {
        this.service = service;
    }

    /**
     * Obtiene un tipo de dimensión por ID.
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

export default GetByIdTipoDimensionesWithDeletedController;
