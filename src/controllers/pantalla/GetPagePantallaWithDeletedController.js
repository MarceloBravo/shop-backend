import GetPagePantallaService from "../../services/pantalla/GetPagePantallaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de registros de pantallas
 * @class GetPagePantallaWithDeletedController
 * @param {GetPagePantallaService} service - Servicio para obtener una página de registros de marcas
 * @returns {GetPagePantallaWithDeletedController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para obtener una página de registros de pantallas de la base de datos.
 */
class GetPagePantallaWithDeletedController{
    constructor(service = new GetPagePantallaService()){
        this.service = service;
    }

    /**
     * Obtiene una página de registros de pantallas de la base de datos.
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

export default GetPagePantallaWithDeletedController;