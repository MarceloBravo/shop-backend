import HardDeleteProductoService from '../../services/producto/HardDeleteProductoService.js';
import { handleError } from "../../shared/functions.js";

/**
 * @class HardDeleteProductoController
 * @description Controlador para la eliminación de productos
 */
class HardDeleteProductoController {
    /**
     * @constructor
     * @description Inicializa el servicio de eliminación de productos
     */
    constructor() {
        this.service = new HardDeleteProductoService();
    }

    /**
     * @method execute
     * @description Maneja la petición de eliminación de un producto
     * @param {Object} req - Objeto de petición
     * @param {Object} res - Objeto de respuesta
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const {id, result} = await this.service.execute(req.params);
            const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminado o registro inexistente';  
            res.json({ id, code: result ? 200 : 500, mensaje });
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteProductoController;