import GetPageValoracionProductoService from "../../services/ValoracionProducto/GetPageValoracionProductoService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de registros incluyendo los eliminados
 * @class
 * @param {GetPageValoracionProductoService} service - Servicio para obtener una página de registros incluyendo los eliminados
 * @returns {GetPageValoracionProductoWithDeletedController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para obtener una página de registros de la base de datos incluyendo los eliminados.
 */
class GetPageValoracionProductoWithDeletedController{
    constructor(service = new GetPageValoracionProductoService()){
        this.service = service;
    }

    /**
     * Obtiene una página de registros de la base de datos incluyendo los eliminados.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación.
     */
    execute = async (req, res) => { 
        try {
            const { pag = 1, limit = 10 } = req.params;
            const { rows , count, totPag} = await this.service.execute(pag, limit, false);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}


export default GetPageValoracionProductoWithDeletedController;