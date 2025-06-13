import GetAllSubCategoriaService from "../../services/subCategoria/GetAllSubCategoriaService.js";
import SubCategoriaRepository from "../../repositories/SubCategoriaRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador encargado de obtener todas las subcategorías incluyendo eliminadas
 * @class GetAllSubCategoriaWithDeletedController
 */
class GetAllSubCategoriaWithDeletedController{
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de subcategorías
     */
    constructor(repository = new SubCategoriaRepository()) {
        this.service = new GetAllSubCategoriaService(repository);
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
