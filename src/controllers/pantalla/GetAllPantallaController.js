import GetAllPantallaService from '../../services/pantalla/GetAllPantallaService.js';
import PantallaRepository from '../../repositories/PantallaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todas las pantallas
 * @class GetAllPantallaController
 */
class GetAllPantallaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de pantallas
     */
    constructor(repository = new PantallaRepository()) {
        this.service = new GetAllPantallaService(repository);
    }

    /**
     * Obtiene todas las pantallas de la base de datos
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute();
            res.json(data);
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllPantallaController;

