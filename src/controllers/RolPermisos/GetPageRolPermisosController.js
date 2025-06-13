import GetPageRolPermisosService from "../../services/RolPermisos/GetPageRolPermisosService.js";
import RolPermisosRepository from '../../repositories/RolPermisosRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de permisos de rol
 * @class GetPageRolPermisosController
 */
class GetPageRolPermisosController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de permisos de rol
     */
    constructor(repository = new RolPermisosRepository()) {
        this.service = new GetPageRolPermisosService(repository);
    }

    /**
     * Ejecuta la obtención de una página de permisos de rol
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
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