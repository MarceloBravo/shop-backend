import GetPageMenuService from "../../services/menu/GetPageMenuService.js";
import MenuRepository from "../../repositories/MenuRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de menús
 * @class GetPageMenuController
 */
class GetPageMenuController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de menús
     */
    constructor(repository = new MenuRepository()) {
        this.service = new GetPageMenuService(repository);
    }

    /**
     * Ejecuta la obtención de una página de menús
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try{
            const { pag = 1, limit = 10 } = req.params;
            const { rows, count, totPag } = await this.service.execute(pag, limit);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageMenuController;