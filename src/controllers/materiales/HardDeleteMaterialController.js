import HardDeleteMaterialService from '../../services/materiales/HardDeleteMaterialService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para eliminar un registro de materiales.
 * @class
 * @param {HardDeleteMaterialService} service - Servicio para eliminar un registro de material
 * @returns {HardDeleteMaterialController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para eliminar un registro de material.
 * */
class HardDeleteMaterialController{
    constructor(service = new HardDeleteMaterialService()){
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
            const { result } = await this.service.execute(id);
            const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminado o registro inexistente';  
            res.json({ id, code: result ? 200 : 500, mensaje });
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    } 
}

export default HardDeleteMaterialController;