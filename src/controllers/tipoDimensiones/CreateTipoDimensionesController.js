import CreateTipoDimensionesService from '../../services/tipoDimensiones/CreateTipoDimensionesService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear un nuevo tipo de dimensión (tipo de medida)
 * @class CreateTipoDimensionesController
 * @param {CreateTipoDimensionesService} service - Servicio para crear una nueva talla numérica
 * @returns {CreateTipoDimensionesController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para crear un nuevo tipo de dimensión (tipo de medida).
 */
class CreateTipoDimensionesController {
    constructor(service = new CreateTipoDimensionesService()) {
        this.service = service;
    }

    /**
     * Maneja la petición para crear un nuevo tipo de dimensiones
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

export default CreateTipoDimensionesController;