import GetByIdCategoriaService from "../../services/Categoria/GetByIdCategoriaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una categoría por ID incluyendo las eliminadas
 * @class GetByIdCategoriaWithDeletedController
 */
class GetByIdCategoriaWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {CategoriaRepository} repository - Repositorio de categorías
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new GetByIdCategoriaService(repository);
    }

    /**
     * Ejecuta la obtención de una categoría por ID incluyendo las eliminadas
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} req.params - Parámetros de la URL
     * @param {string} req.params.id - ID de la categoría a obtener
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id, false);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }       
}

export default GetByIdCategoriaWithDeletedController;