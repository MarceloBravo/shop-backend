import GetAllPantallaService from '../../services/pantalla/GetAllPantallaService.js';
import { handleError } from "../../shared/functions.js";

/**
 *  Controlador encargado de retornar  todas las pantallas de la base de datos incluidos los registros eliminados con soft-delete
 * @class GetAllPantallaWithDeletedController
 */
class GetAllPantallaWithDeletedController{
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de pantallas
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new GetAllPantallaService(repository);
    }

    /**
     * Retorn todas las pantallas de la base de datos incluidos los registros eliminados con soft-delete.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Devuelve una respuesta JSON con el resultado de la operación.
     * */
    execute = async (req, res) => {
        try{
            const data = await this.service.execute(false);
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
    
}

export default GetAllPantallaWithDeletedController;

