import UpdateGeneroService from "../../services/genero/UpdateGeneroService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar un registro de género
 * @class UpdateGeneroController
 */
class UpdateGeneroController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de géneros
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new UpdateGeneroService(repository);
    }

    /**
     * Ejecuta la actualización de un registro de género
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({genero: result.data, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`});
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateGeneroController;