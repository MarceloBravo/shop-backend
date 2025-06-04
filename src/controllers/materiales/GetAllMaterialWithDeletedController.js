import MaterialRepository from '../../repositories/MaterialRepository.js';
import GetAllMaterialService from '../../services/materiales/GetAllMaterialService.js';
import { handleError } from "../../shared/functions.js";


/**
 * Controlador para obtener todos los registros de material incluidos aquellos marcados como eliminados con soft-delete.
 * @class
* @param {GetAllMaterialService} service - Servicio para obtener todos los registros de material incluidos aquellos marcados como eliminados con soft-delete.
* @returns {GetAllMaterialWithDeletedController} - Instancia del controlador
* @description Este controlador se encarga de manejar la lógica para obtener todos los registros de material incluidos aquellos marcados como eliminados con soft-delete.
* */
class GetAllMaterialWithDeletedController{
    constructor(repository = new MaterialRepository()){
        this.service = new GetAllMaterialService(repository);
    }

    /**
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
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

export default GetAllMaterialWithDeletedController;

