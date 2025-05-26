import GetAllRolPermisosService from '../../services/RolPermisos/GetAllRolPermisosService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todos los registros de permisos de rol
 * @class
 * @param {GetAllRolPermisosService} service - Servicio para obtener todos los registros de permisos de rol
 * @returns {GetAllRolPermisosController} - Instancia del controlador
 */
class GetAllRolPermisosController {

    constructor(service = new GetAllRolPermisosService()) {
        this.service = service;
    }

    /**
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute();
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllRolPermisosController;