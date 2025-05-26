import GetAllRolPermisosService from '../../services/RolPermisos/GetAllRolPermisosService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todos los registros de permisos de rol incluyendo eliminados
 * @class
 * @param {GetAllRolPermisosService} service - Servicio para obtener todos los registros de permisos de rol
 * @returns {GetAllRolPermisosWithDeletedController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para obtener todos los registros de permisos de rol incluyendo eliminados.
 */
class GetAllRolPermisosWithDeletedController {    constructor(service = new GetAllRolPermisosService()) {
        this.service = service;
    }

    /**
     * Obtiene todos los registros de permisos de rol incluyendo los eliminados
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
