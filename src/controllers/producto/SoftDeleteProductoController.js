import SoftDeleteProductoService from "../../services/producto/SoftDeleteProductoService.js";
import { handleError } from "../../shared/functions.js";

/**
 * @class SoftDeleteProductoController
 * @description Controlador para el borrado lógico de productos
 */
class SoftDeleteProductoController {
    /**
     * @constructor
     * @description Inicializa el servicio de borrado lógico de productos
     */
    constructor() {
        this.service = new SoftDeleteProductoService();
    }

    /**
     * @method execute
     * @description Maneja la petición de borrado lógico de un producto
     * @param {Object} req - Objeto de petición
     * @param {Object} res - Objeto de respuesta
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {code: result, mensaje : result === 200 ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente' };
            res.json(resp);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteProductoController;