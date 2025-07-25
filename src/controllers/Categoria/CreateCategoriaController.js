import CreateCategoriaService from '../../services/Categoria/CreateCategoriaService.js';
import CategoriaRepository from '../../repositories/CategoriaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear una nueva categoría
 * @class CreateCategoriaController
 */
class CreateCategoriaController {
    /**
     * Crea una instancia del controlador
     * @param {CategoriaRepository} repository - Repositorio de categorías
     */
    constructor(repository = new CategoriaRepository()) {
        this.service = new CreateCategoriaService(repository);
    }

    /**
     * Ejecuta la creación de una nueva categoría
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} req.body - Datos de la categoría a crear
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const result = await this.service.execute(req.body);
            res.json({color: result.color, mensaje: 'Registro creado exitosamente.'});
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }       
}

export default CreateCategoriaController;