import HardDeleteUsuarioService from '../../services/usuario/HardDeleteUsuarioService.js';
import UsuarioRepository from "../../repositories/UsuarioRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado físico de un usuario
 * @class HardDeleteUsuarioController
 */
class HardDeleteUsuarioController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de usuarios
     */
    constructor(repository = new UsuarioRepository()) {
        this.service = new HardDeleteUsuarioService(repository);
    }

    /**
     * Elimina un usuario en la base de datos
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminado o registro inexistente';
            res.json({ id, code: result ? 200 : 500, mensaje });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteUsuarioController;