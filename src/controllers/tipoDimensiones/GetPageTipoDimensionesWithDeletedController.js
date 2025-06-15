import GetPageTipoDimensionesService from '../../services/tipoDimensiones/GetPageTipoDimensionesService.js';
import TipoDimensionesRepository from '../../repositories/TipoDimensionesRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de tipo de dimensiones (tipo de medidas)
 * @class GetPageTipoDimensionesWithDeletedController
 */
class GetPageTipoDimensionesWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tipos de dimensión
     */
    constructor(repository = new TipoDimensionesRepository()) {
        this.service = new GetPageTipoDimensionesService(repository);
    }

    /**
     * Maneja la petición para obtener una página de tipos de dimensiones
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.params;
            const { rows, count, totPag } = await this.service.execute(page, limit, false);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(page), totPag}});
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageTipoDimensionesWithDeletedController;