import CreateSubCategoriaService from "../../services/subCategoria/CreateSubCategoriaService.js";
import SubCategoriaRepository from "../../repositories/SubCategoriaRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear una nueva subcategoría
 * @class CreateSubCategoriaController
 */
class CreateSubCategoriaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de subcategorías
     */
    constructor(repository = new SubCategoriaRepository()) {
        this.service = new CreateSubCategoriaService(repository);
    }

    /**
     * Ejecuta la creación de una nueva subcategoría
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute(req.body);
            res.json({ data, mensaje: 'El registro ha sido creado exitosamente.' });
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default CreateSubCategoriaController;