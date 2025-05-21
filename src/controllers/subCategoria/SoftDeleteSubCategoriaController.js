import SoftDeleteSubCategoriaService from "../../services/subCategoria/SoftDeleteSubCategoriaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador encargado de realizar el soft delete de una subcategoría
 * @class
 * @param {SoftDeleteSubCategoriaService} service - Servicio para realizar el soft delete de una subcategoría
 * @returns {SoftDeleteSubCategoriaController} - Instancia del controlador
 */
class SoftDeleteSubCategoriaController{
    constructor(service = new SoftDeleteSubCategoriaService()){
        this.service = service;
    }

    /**
     * Realiza el soft delete de una subcategoría.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función maneja el soft delete de una subcategoría.
     * */
    execute = async (req, res) => {
        try{
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {
                code: result, 
                mensaje: result ? 'El registro ha sido borrado exitosamente.' : 'El registro no pudo ser borrado o no existe.'
            };
            res.json(resp);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteSubCategoriaController;