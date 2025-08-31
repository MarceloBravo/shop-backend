import HardDeletePantallaService from '../../services/pantalla/HardDeletePantallaService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado físico de una pantalla
 * @class HardDeletePantallaController
 */
class HardDeletePantallaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de pantallas
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new HardDeletePantallaService(repository);
    }

    /**
     * Elimina una pantalla de la base de datos
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
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeletePantallaController;