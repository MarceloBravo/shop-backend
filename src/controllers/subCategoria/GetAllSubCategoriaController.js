import GetAllSubCategoriaService from "../../services/subCategoria/GetAllSubCategoriaService.js";
import SubCategoriaRepository from "../../repositories/SubCategoriaRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todas las subcategorías
 * @class GetAllSubCategoriaController
 */
class GetAllSubCategoriaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de subcategorías
     */
    constructor(repository = new SubCategoriaRepository()) {
        this.service = new GetAllSubCategoriaService(repository);
    }

    /**
     * Ejecuta la obtención de todas las subcategorías
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute();
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllSubCategoriaController;