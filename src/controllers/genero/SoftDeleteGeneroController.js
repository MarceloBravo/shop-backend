import SoftDeleteGeneroService from "../../services/genero/SoftDeleteGeneroService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para eliminar un registro de género de forma lógica
 * @class
 * @param {SoftDeleteGeneroService} service - Servicio para eliminar un registro de género
 * @returns {SoftDeleteGeneroController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para eliminar un registro de género de forma lógica.
 * */
class SoftDeleteGeneroController{
    constructor(service = new SoftDeleteGeneroService()) {
        this.service = service;
    }

    /**
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     s* @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     * */
    execute = async (req, res) => {
        try{
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {code: result, mensaje : result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente' };
            res.json(resp);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteGeneroController;