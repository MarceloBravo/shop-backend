import UpdateTipoDimensionesService from '../../services/tipoDimensiones/UpdateTipoDimensionesService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar un tipo de dimensión (tipo de medida)
 * @class
 * @param {UpdateTipoDimensionesService} service - Servicio para actualizar un tipo de dimensión (tipo de medida)
 * @returns {UpdateTipoDimensionesController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para actualizar un tipo de dimensión (tipo de medida) existente.
 */
class UpdateTipoDimensionesController {
    constructor(service = new UpdateTipoDimensionesService()) {
        this.service = service;
    }

    /**
     * Maneja la petición para actualizar un tipo de dimensiones
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({
                data: result.data, 
                mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`
            });
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}


export default UpdateTipoDimensionesController; 