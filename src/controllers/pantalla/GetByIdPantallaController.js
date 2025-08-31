import GetByIdPantallaService from '../../services/pantalla/GetByIdPantallaService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una pantalla por su ID
 * @class GetByIdPantallaController
 */
class GetByIdPantallaController {
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
        this.service = new GetByIdPantallaService(repository);
    }

    /**
     * Obtiene una pantalla por su ID
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id);
            res.json(data);
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdPantallaController;
