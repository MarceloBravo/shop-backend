import MaterialRepository from '../../repositories/MaterialRepository.js';
import GetByIdMaterialService from '../../services/materiales/GetByIdMaterialService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un registro de material por su ID incluyendo los regístros marcados con soft-deleted
 * @class
 * @param {GetByIdMaterialService} service - Servicio para obtener un registro de material por su ID
 * @returns {GetByIdMaterialWithDeletedController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para obtener un registro de material por su ID
 *               incluyendo los regístros marcados con soft-deleted.
 * */
class GetByIdMaterialWithDeletedController{
    constructor(repository = new MaterialRepository()){
        this.service = new GetByIdMaterialService(repository);
    }
    
    /**
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try{
            const { id } = req.params
            const data = await this.service.execute(id, false)
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdMaterialWithDeletedController;
