import HardDeleteCategoriaService from '../../services/Categoria/HardDeleteCategoriaService.js';
import CategoriaRepository from '../../repositories/CategoriaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado físico de una categoría
 * @class HardDeleteCategoriaController
 */
class HardDeleteCategoriaController {
    /**
     * Crea una instancia del controlador
     * @param {CategoriaRepository} repository - Repositorio de categorías
     */
    constructor(repository = new CategoriaRepository()) {
        this.service = new HardDeleteCategoriaService(repository);
    }

    /**
     * Ejecuta el borrado físico de una categoría
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} req.params - Parámetros de la URL
     * @param {string} req.params.id - ID de la categoría a borrar
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const { result } = await this.service.execute(id);
            const mensaje = result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente';  
            res.json({ id, code: result ? 200 : 500, mensaje });
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}   

export default HardDeleteCategoriaController;