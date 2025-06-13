import GetPageSubCategoriaService from "../../services/subCategoria/GetPageSubCategoriaService.js";
import SubCategoriaRepository from "../../repositories/SubCategoriaRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de subcategorías
 * @class GetPageSubCategoriaController
 */
class GetPageSubCategoriaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de subcategorías
     */
    constructor(repository = new SubCategoriaRepository()) {
        this.service = new GetPageSubCategoriaService(repository);
    }

    /**
     * Ejecuta la obtención de una página de subcategorías
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { pag = 1, limit = 10 } = req.params;
            const { rows, count, totPag } = await this.service.execute(parseInt(pag), parseInt(limit));
            res.json({ data: { data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag } });
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageSubCategoriaController;