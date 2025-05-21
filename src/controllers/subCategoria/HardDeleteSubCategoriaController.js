import HardDeleteSubCategoriaService from "../../services/subCategoria/HardDeleteSubCategoriaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador encargado de eliminar físicamente una subcategoría
 * @class
 * @param {HardDeleteSubCategoriaService} service - Servicio para eliminar físicamente una subcategoría
 * @returns {HardDeleteSubCategoriaController} - Instancia del controlador
 */
class HardDeleteSubCategoriaController{
    constructor(service = new HardDeleteSubCategoriaService()){
        this.service = service;
    }

    /**
     * Elimina físicamente una subcategoría.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función maneja la eliminación física de una subcategoría.
     * */
    execute = async (req, res) => {
        try{
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {
                code: result, 
                mensaje: result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no pudo ser eliminado o no existe.'
            };
            res.json(resp);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteSubCategoriaController;
