import SoftDeleteMaterialService from "../../services/materiales/SoftDeleteMaterialService.js";
import { handleError } from "../../shared/functions.js";


/**
 * Controlador para eliminar un registro de material de forma lógica
 * @class
 * @param {SoftDeleteMaterialService} service - Servicio para eliminar un registro de material
 * @returns {SoftDeleteMaterialController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para eliminar un registro de material de forma lógica.
 * */
class SoftDeleteMaterialController{
    constructor(service = new SoftDeleteMaterialService()){
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

export default SoftDeleteMaterialController;