import HardDeleteGeneroService from '../../services/genero/HardDeleteGeneroService.js';
import { handleError } from "../../shared/functions.js";


/**
 * Controlador para eliminar un registro de género
 * @class
 * @param {HardDeleteGeneroService} service - Servicio para eliminar un registro de género
 * @returns {HardDeleteGeneroController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para eliminar un registro de género.
 * */
class HardDeleteGeneroController{
    constructor(service = new HardDeleteGeneroService()) {
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
            const {result } = await this.service.execute(id);
            const mensaje = result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente';  
            res.json({ id, code: result ? 200 : 500, mensaje });
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteGeneroController;