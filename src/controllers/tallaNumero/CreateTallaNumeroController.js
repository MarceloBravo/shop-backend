import CreateTallaNumeroService from "../../services/tallaNumero/CreateTallaNumeroService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear una nueva talla numérica
 * @class
 * @param {CreateTallaNumeroService} service - Servicio para crear una nueva talla numérica
 * @returns {CreateTallaNumeroController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para crear una nueva talla numérica.
 */
class CreateTallaNumeroController {
    constructor(service = new CreateTallaNumeroService()) {
        this.service = service;
    }

    /**
     * Crea una nueva talla numérica.
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {        
            const data = await this.service.execute(req.body);
            res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default CreateTallaNumeroController;