import GetPageProductoService from "../../services/producto/GetPageProductoService.js";
import ProductoRepository from '../../repositories/ProductoRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de productos
 * @class GetPageProductoController
 */
class GetPageProductoController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de productos
     */
    constructor(repository = null) {
        if(!repository){
            repository = new ProductoRepository()
        }
        this.service = new GetPageProductoService(repository);
    }

    /**
     * Obtiene una página de productos de la base de datos
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación
     */
    execute = async (req, res) => { 
        try {
            const { pag = 1, limit = 10, filter = {} } = req.params;
            const { rows, count, totPag } = await this.service.execute(pag, limit, true, filter);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageProductoController;