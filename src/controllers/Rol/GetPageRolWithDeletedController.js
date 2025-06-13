import GetPageRolService from "../../services/Rol/GetPageRolService.js";
import RolRepository from '../../repositories/RolRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de roles incluyendo los eliminados
 * @class GetPageRolWithDeletedController
 */
class GetPageRolWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de roles
     */
    constructor(repository = new RolRepository()) {
        this.service = new GetPageRolService(repository);
    }

    /**
     * Ejecuta la obtención de una página de roles incluyendo los eliminados
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
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

export default GetPageRolWithDeletedController;