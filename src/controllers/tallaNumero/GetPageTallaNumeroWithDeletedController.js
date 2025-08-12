import GetPageTallaNumeroService from '../../services/tallaNumero/GetPageTallaNumeroService.js';
import TallaNumeroRepository from '../../repositories/TallaNumeroRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de tallas numéricas incluyendo los eliminados
 * @class GetPageTallaNumeroWithDeletedController
 */
class GetPageTallaNumeroWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tallas numéricas
     */
    constructor(repository) {
        if(!repository) {
            repository = new TallaNumeroRepository()
        }
        this.service = new GetPageTallaNumeroService(repository);
    }

    /**
     * Ejecuta la obtención de una página de tallas numéricas incluyendo los eliminados
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
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

export default GetPageTallaNumeroWithDeletedController;
