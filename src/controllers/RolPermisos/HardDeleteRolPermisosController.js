import HardDeleteRolPermisosService from '../../services/RolPermisos/HardDeleteRolPermisosService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para eliminar permanentemente un permiso de rol
 * @class
 * @param {HardDeleteRolPermisosService} service - Servicio para eliminar permisos de rol
 * @returns {HardDeleteRolPermisosController} - Instancia del controlador
 */
class HardDeleteRolPermisosController {

    constructor(service = new HardDeleteRolPermisosService()) {
        this.service = service;
    }

    /**
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const {id, result} = await this.service.execute(req.params.id);
            const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no pudo ser eliminado o registro inexistente';  
            res.json({ id, code: result ? 200 : 500, mensaje });
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteRolPermisosController;