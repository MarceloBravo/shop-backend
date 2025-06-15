import GetPageTipoDimensionesService from '../../services/tipoDimensiones/GetPageTipoDimensionesService.js';
import TipoDimensionesRepository from '../../repositories/TipoDimensionesRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de tipos de dimensión
 * @class GetPageTipoDimensionesController
 */
class GetPageTipoDimensionesController {
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
            const { pag = 1, limit = 10 } = req.params;
            const { rows, count, totPag } = await this.service.execute(pag, limit);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageTipoDimensionesController;