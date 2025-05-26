import GetPageRolPermisosService from "../../services/RolPermisos/GetPageRolPermisosService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de permisos de rol incluyendo eliminados
 * @class
 * @param {GetPageRolPermisosService} service - Servicio para obtener permisos de rol paginados
 * @returns {GetPageRolPermisosWithDeletedController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para obtener una página de permisos de rol incluyendo eliminados.
 */
class GetPageRolPermisosWithDeletedController {    constructor(service = new GetPageRolPermisosService()) {
        this.service = service;
    }

    /**
     * Obtiene una página de permisos de rol incluyendo eliminados
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @param {string} req.params.pag - Número de página (por defecto: 1)
     * @param {string} [req.params.limit] - Límite de registros por página (por defecto: 10)
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta con los datos paginados
     */
    execute = async (req, res) => {
        try {
            const { pag = 1, limit = 10 } = req.params;
            const { rows, count, totPag } = await this.service.execute(pag, limit, false);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageRolPermisosWithDeletedController;
