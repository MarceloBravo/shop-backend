import UpdateMaterialService from "../../services/materiales/UpdateMaterialService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar un registro de material
 * @class
 * @param {UpdateMaterialService} service - Servicio para actualizar un registro de material
 * @returns {UpdateMaterialController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para actualizar un registro de material.
 */
class UpdateMaterialController{
    constructor(service = new UpdateMaterialService()){
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
            res.json({marca: result.marca, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateMaterialController;