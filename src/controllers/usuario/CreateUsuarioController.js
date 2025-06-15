import CreateUsuarioService from '../../services/usuario/CreateUsuarioService.js';
import UsuarioRepository from "../../repositories/UsuarioRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear un nuevo usuario
 * @class CreateUsuarioController
 */
class CreateUsuarioController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de usuarios
     */
    constructor(repository = new UsuarioRepository()) {
        this.service = new CreateUsuarioService(repository);
    }

    /**
     * Ejecuta la creación de un nuevo usuario
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute(req.body);
            res.json({ data, mensaje: 'El registro ha sido creado exitosamente.' });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default CreateUsuarioController;