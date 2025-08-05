import GetPageMaterialService from "../../services/materiales/GetPageMaterialService.js";
import MaterialRepository from "../../repositories/MaterialRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de materiales
 * @class GetPageMaterialController
 */
class GetPageMaterialController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de materiales
     */
    constructor(repository = null) {
        if(!repository){
            repository = new MaterialRepository();
        }
        this.service = new GetPageMaterialService(repository);
    }

    /**
     * Ejecuta la obtención de una página de materiales
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { pag = 1, limit = 10 } = req.params;
            const { rows, count, totPag } = await this.service.execute(pag, limit);
            res.json({
                data: {
                    data: rows,
                    totReg: count,
                    rows: rows.length,
                    pag: parseInt(pag),
                    totPag
                }
            });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageMaterialController;