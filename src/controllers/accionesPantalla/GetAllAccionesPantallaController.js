import GetAllAccionesPantallaService from '../../services/accionesPantalla/GetAllAccionesPantallaService.js';
import AccionesPantallaRepository from "../../repositories/AccionesPantallaRepository.js";
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
    constructor(repository = new AccionesPantallaRepository()) {
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

