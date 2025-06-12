import GetPagePantallaService from "../../services/pantalla/GetPagePantallaService.js";
import PantallaRepository from '../../repositories/PantallaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de pantallas
 * @class GetPagePantallaController
 */
class GetPagePantallaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de pantallas
     */
    constructor(repository = new PantallaRepository()) {
        this.service = new GetPagePantallaService(repository);
    }

    /**
     * Obtiene una página de pantallas de la base de datos
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación
     */
    execute = async (req, res) => {
        try {
            const { pag = 1, limit = 10 } = req.params;
            const { rows, count, totPag } = await this.service.execute(pag, limit);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetPagePantallaController;