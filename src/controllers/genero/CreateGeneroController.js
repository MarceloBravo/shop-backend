import CreateGeneroService from "../../services/genero/CreateGeneroService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear un nuevo registro de género
 * @class CreateGeneroController
 */
class CreateGeneroController {
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
        this.service = new CreateGeneroService(repository);
    }

    /**
     * Ejecuta la creación de un nuevo registro de género
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute(req.body);
            res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default CreateGeneroController;