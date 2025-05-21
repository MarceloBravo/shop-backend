import GetPageTallaLetraService from '../../services/tallaLetra/GetPageTallaLetraService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de tallas letra incluyendo registros eliminados
 * @class
 * @param {GetPageTallaLetraService} service - Servicio para obtener una página de tallas letra
 * @returns {GetPageTallaLetraWithDeletedController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para obtener una página de tallas letra incluyendo registros eliminados.
 */
class GetPageTallaLetraWithDeletedController {
    constructor(service = new GetPageTallaLetraService()) {
        this.service = service;
    }

    /**
     * Obtiene una página de tallas letra incluyendo registros eliminados.
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const { pag = 1, limit = 10 } = req.params;
            const { rows, count, totPag } = await this.service.execute(pag, limit, false);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageTallaLetraWithDeletedController;
