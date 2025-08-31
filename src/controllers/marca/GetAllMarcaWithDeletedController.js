import GetAllMarcaService from '../../services/marca/GetAllMarcaService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todas las marcas
 * @class
 * @param {GetAllMarcaService} service - Servicio para obtener todas las marcas
 * @returns {GetAllMarcaController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para obtener todas las marcas de la base de datos.
 */
class GetAllMarcaWithDeletedController{
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No sde ha recibido el repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new GetAllMarcaService(repository);
    }  

    /**
     * Obtiene todos los registros de las marcas de la base de datos incluidos los registros marcados como eliminados.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación.
     */
    execute = async (req, res) => {
        try{        
            const data = await this.service.execute(false);
            res.json(data);
        }catch(error){
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllMarcaWithDeletedController;

