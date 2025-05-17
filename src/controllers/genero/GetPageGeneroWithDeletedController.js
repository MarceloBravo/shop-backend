import GetPageGeneroService from "../../services/genero/GetPageGeneroService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de registros de género incluyendo los registros marcados como eliminados
 * @class
 * @param {GetPageGeneroService} service - Servicio para obtener una página de registros de género
 * @returns {GetPageGeneroWithDeletedController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para obtener una página de registros de género.
 * */
class GetPageGeneroWithDeletedController{
    constructor(service = new GetPageGeneroService()) {
        this.service = service;
    }

    /**
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
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

export default GetPageGeneroWithDeletedController;