import GetAllAccionesPantallaService from '../../services/accionesPantalla/GetAllAccionesPantallaService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todas las acciones de pantalla
 * @class GetAllAccionesPantallaController
 */
class GetAllAccionesPantallaController {
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
        this.service = new GetAllAccionesPantallaService(repository);
    }

    /**
     * Ejecuta la obtención de todas las acciones de pantalla
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute();
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllAccionesPantallaController;

