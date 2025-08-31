import CreateRolService from '../../services/Rol/CreateRolService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear un nuevo rol
 * @class CreateRolController
 */
class CreateRolController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de roles
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new CreateRolService(repository);
    }

    /**
     * Ejecuta la creación de un nuevo rol
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

export default CreateRolController;