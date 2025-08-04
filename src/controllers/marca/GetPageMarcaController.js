import GetPageMarcaService from "../../services/marca/GetPageMarcaService.js";
import MarcaRepository from "../../repositories/MarcaRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de marcas
 * @class GetPageMarcaController
 */
class GetPageMarcaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de marcas
     */
    constructor(repository = null) {
        if(!repository){
            repository = new MarcaRepository();
        }
        this.service = new GetPageMarcaService(repository);
    }

    /**
     * Ejecuta la obtención de una página de marcas
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

export default GetPageMarcaController;