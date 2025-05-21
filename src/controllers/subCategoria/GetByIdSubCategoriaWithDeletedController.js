import GetByIdSubCategoriaService from "../../services/subCategoria/GetByIdSubCategoriaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador encargado de obtener una subcategoría por su ID incluyendo registros eliminados
 * @class
 * @param {GetByIdSubCategoriaService} service - Servicio para obtener una subcategoría
 * @returns {GetByIdSubCategoriaWithDeletedController} - Instancia del controlador
 */
class GetByIdSubCategoriaWithDeletedController{
    constructor(service = new GetByIdSubCategoriaService()){
        this.service = service;
    }

    /**
     * Obtiene una subcategoría por su ID incluyendo registros eliminados.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función maneja la obtención de una subcategoría por su ID incluyendo registros eliminados.
     * */
    execute = async (req, res) => {
        try{
            const data = await this.service.execute(req.params.id, false);
            if(!data) return res.status(404).json({mensaje: 'Registro no encontrado'});
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdSubCategoriaWithDeletedController;
