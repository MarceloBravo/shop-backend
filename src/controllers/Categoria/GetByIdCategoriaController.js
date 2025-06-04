import GetByIdCategoriaService from "../../services/Categoria/GetByIdCategoriaService.js";
import CategoriaRepository from '../../repositories/CategoriaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una categoría por ID
 * @class GetByIdCategoriaController
 */
class GetByIdCategoriaController {
    /**
     * Crea una instancia del controlador
     * @param {CategoriaRepository} repository - Repositorio de categorías
     */
    constructor(repository = new CategoriaRepository()) {
        this.service = new GetByIdCategoriaService(repository);
    }

    /**
     * Ejecuta la obtención de una categoría por ID
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} req.params - Parámetros de la URL
     * @param {string} req.params.id - ID de la categoría a obtener
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }       
}

export default GetByIdCategoriaController;