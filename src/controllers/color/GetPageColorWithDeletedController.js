import GetPageColorService from "../../services/color/GetPageColorService.js";
import ColorRepository from '../../repositories/ColorRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de colores incluyendo los eliminados
 * @class GetPageColorWithDeletedController
 */
class GetPageColorWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de colores
     */
    constructor(repository = null) {
        if(!repository){
            repository = new ColorRepository();
        }
        this.service = new GetPageColorService(repository);
    }

    /**
     * Ejecuta la obtención de una página de colores incluyendo los eliminados
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { pag = 1, limit = 10 } = req.params;
            const { rows, count, totPag } = await this.service.execute(pag, limit, false);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }   
}

export default GetPageColorWithDeletedController;