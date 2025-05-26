import SoftDeleteRolPermisosService from "../../services/RolPermisos/SoftDeleteRolPermisosService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar el borrado lógico de permisos de roles
 * @class
 * @param {SoftDeleteRolPermisosService} service - Servicio para realizar el borrado lógico de permisos de roles
 * @returns {SoftDeleteRolPermisosController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para realizar el borrado lógico de permisos de roles.
 */
class SoftDeleteRolPermisosController {
    
    constructor(service = new SoftDeleteRolPermisosService()) {
        this.service = service;
    }

    /**
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {code: result, mensaje: result ? 'El registro ha sido borrado exitosamente.' : 'El registro no pudo ser borrado o registro inexistente'};
            res.json(resp);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteRolPermisosController;