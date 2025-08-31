import GetAllRolPermisosService from '../../services/RolPermisos/GetAllRolPermisosService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todos los permisos de rol incluyendo los eliminados
 * @class GetAllRolPermisosWithDeletedController
 */
class GetAllRolPermisosWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de permisos de rol
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new GetAllRolPermisosService(repository);
    }

    /**
     * Ejecuta la obtención de todos los permisos de rol incluyendo los eliminados
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute(false);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllRolPermisosWithDeletedController;
