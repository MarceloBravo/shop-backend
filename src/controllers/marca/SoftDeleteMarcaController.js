import SoftDeleteMarcaService from "../../services/marca/SoftDeleteMarcaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para eliminar una marca de forma suave
 * @class SoftDeleteMarcaController
 */
class SoftDeleteMarcaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de marcas
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No sde ha recibido el repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new SoftDeleteMarcaService(repository);
    }

    /**
     * Ejecuta la eliminación suave de una marca
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {
                id,
                code: result ? 200 : 500,
                mensaje: result ? 'El registro ha sido borrado exitosamente.' : 'El registro no pudo ser borrado o registro inexistente'
            };
            res.json(resp);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteMarcaController;