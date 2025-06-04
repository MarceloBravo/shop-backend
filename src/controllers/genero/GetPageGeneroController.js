import GetPageGeneroService from "../../services/genero/GetPageGeneroService.js";
import GeneroRepository from '../../repositories/GeneroRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de registros de género
 * @class GetPageGeneroController
 */
class GetPageGeneroController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de géneros
     */
    constructor(repository = new GeneroRepository()) {
        this.service = new GetPageGeneroService(repository);
    }

    /**
     * Ejecuta la obtención de una página de registros de género
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { pag = 1, limit = 10 } = req.params;
            const { rows, count, totPag } = await this.service.execute(pag, limit);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageGeneroController;