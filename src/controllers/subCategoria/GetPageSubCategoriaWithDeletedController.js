import GetPageSubCategoriaService from "../../services/subCategoria/GetPageSubCategoriaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador encargado de obtener subcategorías paginadas incluyendo eliminadas
 * @class
 * @param {GetPageSubCategoriaService} service - Servicio para obtener subcategorías paginadas
 * @returns {GetPageSubCategoriaWithDeletedController} - Instancia del controlador
 */
class GetPageSubCategoriaWithDeletedController{
    constructor(service = new GetPageSubCategoriaService()){
        this.service = service;
    }

    /**
     * Obtiene subcategorías paginadas incluyendo eliminadas.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función maneja la obtención de subcategorías paginadas incluyendo eliminadas.
     * */
    execute = async (req, res) => {
        try{
            const { pag, limit } = req.params;
            const data = await this.service.execute(parseInt(pag), parseInt(limit), false);
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageSubCategoriaWithDeletedController;
