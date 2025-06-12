import SoftDeletePantallaService from "../../services/pantalla/SoftDeletePantallaService.js";
import PantallaRepository from '../../repositories/PantallaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado lógico de una pantalla
 * @class SoftDeletePantallaController
 */
class SoftDeletePantallaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de pantallas
     */
    constructor(repository = new PantallaRepository()) {
        this.service = new SoftDeletePantallaService(repository);
    }

    /**
     * Marca una pantalla como eliminada en la base de datos
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {code: result, mensaje: result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente'};
            res.json(resp);
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeletePantallaController;