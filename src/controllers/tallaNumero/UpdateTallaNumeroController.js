import UpdateTallaNumeroService from "../../services/tallaNumero/UpdateTallaNumeroService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar una talla numérica
 * @class
 * @param {UpdateTallaNumeroService} service - Servicio para actualizar una talla numérica
 * @returns {UpdateTallaNumeroController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para actualizar una talla numérica existente.
 */
class UpdateTallaNumeroController {
    constructor(service = new UpdateTallaNumeroService()) {
        this.service = service;
    }

    /**
     * Actualiza una talla numérica existente.
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({data: result.data, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`});
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateTallaNumeroController;