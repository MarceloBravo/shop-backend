import UpdateGeneroService from "../../services/genero/UpdateGeneroService.js";
import { handleError } from "../../shared/functions.js";


/**
 * Controlador para actualizar un registro de género
 * @class
 * @param {UpdateGeneroService} service - Servicio para actualizar un registro de género
 * @returns {UpdateGeneroController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para actualizar un registro de género.
 */
class UpdateGeneroController{

    constructor(service = new UpdateGeneroService()) {
        this.service = service;
    }

    /**
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try{
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({genero: result.genero, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateGeneroController;