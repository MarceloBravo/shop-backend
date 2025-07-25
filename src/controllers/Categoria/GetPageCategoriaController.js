import GetPageCategoriaService from "../../services/Categoria/GetPageCategoriaService.js";
import CategoriaRepository from '../../repositories/CategoriaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de categorías
 * @class GetPageCategoriaController
 */
class GetPageCategoriaController {
    /**
     * Crea una instancia del controlador
     * @param {CategoriaRepository} repository - Repositorio de categorías
     */
    constructor(repository = new CategoriaRepository()) {
        this.service = new GetPageCategoriaService(repository);
    }

    /**
     * Ejecuta la obtención de una página de categorías
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} req.params - Parámetros de la URL
     * @param {number} [req.params.pag=1] - Número de página
     * @param {number} [req.params.limit=10] - Límite de registros por página
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

export default GetPageCategoriaController;