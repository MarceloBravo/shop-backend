import GetPageProductoService from "../../services/producto/GetPageProductoService.js";
import ProductoRepository from '../../repositories/ProductoRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * @class GetPageProductoWithDeletedController
 * @description Controlador para la obtención de páginas de productos
 */
class GetPageProductoWithDeletedController {
    /**
     * @constructor
     * @description Inicializa el servicio de obtención de página de productos
     */
    constructor(repository = null) {
        if(!repository){
            repository = new ProductoRepository()
        }
        this.service = new GetPageProductoService(repository);
    }

    /**
     * @method execute
     * @description Maneja la petición de obtención de una página de productos
     * @param {Object} req - Objeto de petición
     * @param {Object} res - Objeto de respuesta
     * @returns {Promise<void>}
     */
    execute = async (req, res) => { 
        try {
            const { pag = 1, limit = 10, filter = null } = req.params;
            const { rows, count, totPag } = await this.service.execute(pag, limit, false, filter);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageProductoWithDeletedController;