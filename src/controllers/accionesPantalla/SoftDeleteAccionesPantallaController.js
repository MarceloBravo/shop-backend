import SoftDeleteAccionesPantallaService from "../../services/accionesPantalla/SoftDeleteAccionesPantallaService.js";
import AccionesPantallaRepository from "../../repositories/AccionesPantallaRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para eliminar lógicamente una acción de pantalla
 * @class SoftDeleteAccionesPantallaController
 */
class SoftDeleteAccionesPantallaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de acciones de pantalla
     */
    constructor(repository = new AccionesPantallaRepository()) {
        this.service = new SoftDeleteAccionesPantallaService(repository);
    }
    
    /**
     * Ejecuta la eliminación lógica de una acción de pantalla
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {
                code: result, 
                mensaje: result == 200 ? 'El registro ha sido borrado exitosamente.' : 'El registro no pudo ser borrado o registro inexistente'
            };
            res.json(resp);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteAccionesPantallaController;