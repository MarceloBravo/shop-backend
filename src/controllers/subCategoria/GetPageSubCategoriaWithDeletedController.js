import GetPageSubCategoriaService from "../../services/subCategoria/GetPageSubCategoriaService.js";
import SubCategoriaRepository from "../../repositories/SubCategoriaRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador encargado de obtener subcategorías paginadas incluyendo eliminadas
 * @class  GetPageSubCategoriaWithDeletedController
 */
class GetPageSubCategoriaWithDeletedController{
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de subcategorías
     */
    constructor(repository) {
        if(!repository){
            repository = new SubCategoriaRepository();
        }
        this.service = new GetPageSubCategoriaService(repository);
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
            const { pag = 1, limit = 10 } = req.params;
            const { rows, count, totPag } = await this.service.execute(pag, limit, false);
            res.json({ data: { data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag } });
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageSubCategoriaWithDeletedController;
