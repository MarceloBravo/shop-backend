import SoftDeleteCategoriaService from "../../services/Categoria/SoftDeleteCategoriaService.js";
import CategoriaRepository from '../../repositories/CategoriaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado lógico de una categoría
 * @class SoftDeleteCategoriaController
 */
class SoftDeleteCategoriaController {
    /**
     * Crea una instancia del controlador
     * @param {CategoriaRepository} repository - Repositorio de categorías
     */
    constructor(repository = new CategoriaRepository()) {
        this.service = new SoftDeleteCategoriaService(repository);
    }

    /**
     * Ejecuta el borrado lógico de una categoría
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} req.params - Parámetros de la URL
     * @param {string} req.params.id - ID de la categoría a borrar
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {code: result.result ? 200 : 500, mensaje: result.result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente' };
            res.json(resp);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }   
}

export default SoftDeleteCategoriaController;