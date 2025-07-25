import GetAllCategoriaService from '../../services/Categoria/GetAllCategoriaService.js';
import CategoriaRepository from '../../repositories/CategoriaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todas las categorías
 * @class GetAllCategoriaController
 */
class GetAllCategoriaController {
    /**
     * Crea una instancia del controlador
     * @param {CategoriaRepository} repository - Repositorio de categorías
     */
    constructor(repository = new CategoriaRepository()) {
        this.service = new GetAllCategoriaService(repository);
    }

    /**
     * Ejecuta la obtención de todas las categorías
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

export default GetAllCategoriaController;