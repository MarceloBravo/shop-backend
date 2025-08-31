import SoftDeleteSubCategoriaService from "../../services/subCategoria/SoftDeleteSubCategoriaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado lógico de una subcategoría
 * @class SoftDeleteSubCategoriaController
 */
class SoftDeleteSubCategoriaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de subcategorías
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new SoftDeleteSubCategoriaService(repository);
    }

    /**
     * Ejecuta el borrado lógico de una subcategoría
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const mensaje = result ? 'El registro ha sido borrado exitosamente.' : 'El registro no pudo ser borrado o registro inexistente';
            res.json({ id, code: result ? 200 : 500, mensaje });
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteSubCategoriaController;