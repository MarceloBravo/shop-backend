import UpdateCategoriaService from "../../services/Categoria/UpdateCategoriaService.js";
import CategoriaRepository from '../../repositories/CategoriaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar o crear una categoría
 * @class UpdateCategoriaController
 */
class UpdateCategoriaController {
    /**
     * Crea una instancia del controlador
     * @param {CategoriaRepository} repository - Repositorio de categorías
     */
    constructor(repository = new CategoriaRepository()) {
        this.service = new UpdateCategoriaService(repository);
    }

    /**
     * Ejecuta la actualización o creación de una categoría
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} req.params - Parámetros de la URL
     * @param {string} req.params.id - ID de la categoría a actualizar
     * @param {Object} req.body - Datos de la categoría a actualizar
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id, req.body);
            res.json({data: data.data, mensaje: `Registro ${data.created ? 'creado' : 'actualizado'} exitosamente.`})
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }       
}

export default UpdateCategoriaController;