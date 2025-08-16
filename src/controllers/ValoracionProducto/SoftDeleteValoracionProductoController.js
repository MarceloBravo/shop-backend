import SoftDeleteValoracionProductoService from "../../services/ValoracionProducto/SoftDeleteValoracionProductoService.js";
import ValoracionProductoRepository from "../../repositories/ValoracionProductoRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado lógico de una valoración de producto
 * @class SoftDeleteValoracionProductoController
 */
class SoftDeleteValoracionProductoController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de valoraciones de productos
     */
    constructor(repository = null) {
        if(!repository) {
            repository = new ValoracionProductoRepository();
        }
        this.service = new SoftDeleteValoracionProductoService(repository);
    }

    /**
     * Ejecuta el borrado lógico de una valoración de producto
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {code: result, mensaje: result ? 'El registro ha sido borrado exitosamente.' : 'El registro no pudo ser borrado o registro inexistente'};
            res.json(resp);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteValoracionProductoController;