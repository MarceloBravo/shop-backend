import GetPageUsuarioService from "../../services/usuario/GetPageUsuarioService.js";
import UsuarioRepository from "../../repositories/UsuarioRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de usuarios incluyendo los eliminados
 * @class GetPageUsuarioWithDeletedController
 */
class GetPageUsuarioWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de usuarios
     */
    constructor(repository = null) {
        if (!repository) {
            repository = new UsuarioRepository();
        }   
        this.service = new GetPageUsuarioService(repository);
    }

    /**
     * Ejecuta la obtención de una página de usuarios incluyendo los eliminados
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { pag = 1, limit = 10 } = req.params;
            const { rows, count, totPag } = await this.service.execute(pag, limit, false);
            res.json({ data: { data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag } });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageUsuarioWithDeletedController;