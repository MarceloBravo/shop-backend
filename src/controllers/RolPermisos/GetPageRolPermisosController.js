import GetPageRolPermisosService from "../../services/RolPermisos/GetPageRolPermisosService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de permisos de rol
 * @class
 * @param {GetPageRolPermisosService} service - Servicio para obtener permisos de rol paginados
 * @returns {GetPageRolPermisosController} - Instancia del controlador
 */
class GetPageRolPermisosController {

    constructor(service = new GetPageRolPermisosService()) {
        this.service = service;
    }

    /**
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => { 
        try {
            const { pag = 1, limit = 10 } = req.params;
            const { rows, count, totPag } = await this.service.execute(pag, limit);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageRolPermisosController;