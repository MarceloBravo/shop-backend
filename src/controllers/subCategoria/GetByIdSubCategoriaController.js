import GetByIdSubCategoriaService from "../../services/subCategoria/GetByIdSubCategoriaService.js";
import SubCategoriaRepository from "../../repositories/SubCategoriaRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una subcategoría por su ID
 * @class GetByIdSubCategoriaController
 */
class GetByIdSubCategoriaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de subcategorías
     */
    constructor(repository) {
        if(!repository){
            repository = new SubCategoriaRepository();
        }
        this.service = new GetByIdSubCategoriaService(repository);
    }

    /**
     * Ejecuta la obtención de una subcategoría por su ID
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id);
            if (!data) return res.status(404).json({ mensaje: 'Registro no encontrado' });
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdSubCategoriaController;