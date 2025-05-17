import CreateGeneroService from "../../services/genero/CreateGeneroService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear un nuevo registro de género
 * @class
 * @param {CreateGeneroService} service - Servicio para crear un nuevo registro de género
 * @returns {CreateGeneroController} - Instancia del controlador
 */
class CreateGeneroController{
    constructor(service = new CreateGeneroService()) {
        this.service = service;
    }

    /**
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try{        
            const data = await this.service.execute(req.body);
            res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default CreateGeneroController;