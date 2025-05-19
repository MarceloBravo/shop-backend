import GetAllMaterialService from '../../services/materiales/GetAllMaterialService.js';
import { handleError } from "../../shared/functions.js";


/**
 * Controlador para obtener todos los registros de material.
 * @class
* @param {GetAllMaterialService} service - Servicio para obtener todos los registros de material.
* @returns {GetAllMaterialController} - Instancia del controlador
* @description Este controlador se encarga de manejar la lógica para obtener todos los registros de material.
* */
class GetAllMaterialController{
    constructor(service = new GetAllMaterialService()){
        this.service = service;
    }

    /**
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try{
            const data = await this.service.execute();
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    } 
}

export default GetAllMaterialController;

