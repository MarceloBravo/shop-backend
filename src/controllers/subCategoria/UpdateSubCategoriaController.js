import UpdateSubCategoriaService from "../../services/subCategoria/UpdateSubCategoriaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar una subcategoría
 * @class UpdateSubCategoriaController
 */
class UpdateSubCategoriaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de subcategorías
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new UpdateSubCategoriaService(repository);
    }

    /**
     * Ejecuta la actualización de una subcategoría
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({ subcategoria: result.data, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.` });
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateSubCategoriaController;