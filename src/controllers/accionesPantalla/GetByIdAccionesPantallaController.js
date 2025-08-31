import GetByIdAccionesPantallaService from '../../services/accionesPantalla/GetByIdAccionesPantallaService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una acción de pantalla por su ID
 * @class GetByIdAccionesPantallaController
 */
class GetByIdAccionesPantallaController {
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
        this.service = new GetByIdAccionesPantallaService(repository);
    }

    /**
     * Ejecuta la obtención de una acción de pantalla por su ID
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id);
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdAccionesPantallaController;
