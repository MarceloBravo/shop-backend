import HardDeleteProductoService from '../../services/producto/HardDeleteProductoService.js';
import ProductoRepository from '../../repositories/ProductoRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado físico de un producto
 * @class HardDeleteProductoController
 */
class HardDeleteProductoController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de productos
     */
    constructor(repository = new ProductoRepository()) {
        this.service = new HardDeleteProductoService(repository);
    }

    /**
     * Elimina un producto de la base de datos
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminado o registro inexistente';  
            res.json({ id, code: result ? 200 : 500, mensaje });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteProductoController;