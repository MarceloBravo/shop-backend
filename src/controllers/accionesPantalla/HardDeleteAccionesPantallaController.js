import HardDeleteAccionesPantallaService from '../../services/accionesPantalla/HardDeleteAccionesPantallaService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para eliminar permanentemente una acción de pantalla
 * @class HardDeleteAccionesPantallaController
 */
class HardDeleteAccionesPantallaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de acciones de pantalla
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new HardDeleteAccionesPantallaService(repository);
    }
    
    /**
     * Ejecuta la eliminación permanente de una acción de pantalla
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const {id, result} = await this.service.execute(req.params.id);
            res.json({ id, code: 200, mensaje: 'El registro ha sido eliminado exitosamente.' });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteAccionesPantallaController;