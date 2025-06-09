import GetPageMenuService from "../../services/menu/GetPageMenuService.js";
import MenuRepository from "../../repositories/MenuRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de registros de menús inlcuidos los registros marcados como eliminados.
 * @class
 * @param {GetPageMarcaService} service - Servicio para obtener una página de registros
 * @returns {GetPageMenuWithDeletedController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para obtener una página de registros de menús de la base de datos.
 */
class GetPageMenuWithDeletedController{
    constructor(menuRepository = new MenuRepository()){
        this.service = new GetPageMenuService(menuRepository);
    }

    /**
     * Obtiene una página de registros de menús de la base de datos inlcuidos los registros marcados como eliminados.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación.
     */
    execute = async (req, res) => {
        try{
            const { pag = 1, limit = 10 } = req.params;
            const { rows , count, totPag } = await this.service.execute(pag, limit, false);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageMenuWithDeletedController;