import GetAllSubCategoriaService from "../../services/subCategoria/GetAllSubCategoriaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador encargado de obtener todas las subcategorías incluyendo eliminadas
 * @class
 * @param {GetAllSubCategoriaService} service - Servicio para obtener subcategorías
 * @returns {GetAllSubCategoriaWithDeletedController} - Instancia del controlador
 */
class GetAllSubCategoriaWithDeletedController{
    constructor(service = new GetAllSubCategoriaService()){
        this.service = service;
    }

    /**
     * Obtiene todas las subcategorías incluyendo eliminadas.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función maneja la obtención de todas las subcategorías incluyendo eliminadas.
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

export default GetAllSubCategoriaWithDeletedController;
