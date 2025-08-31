import GetPageValoracionProductoService from "../../services/ValoracionProducto/GetPageValoracionProductoService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de valoraciones de productos
 * @class GetPageValoracionProductoController
 */
class GetPageValoracionProductoController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de valoraciones de productos
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new GetPageValoracionProductoService(repository);
    }

    /**
     * Ejecuta la obtención de una página de valoraciones de productos
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

export default GetPageValoracionProductoController;