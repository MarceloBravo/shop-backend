import UpdateRolPermisosService from "../../services/RolPermisos/UpdateRolPermisosService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar un permiso de rol
 * @class
 * @param {UpdateRolPermisosService} service - Servicio para actualizar permisos de rol
 * @returns {UpdateRolPermisosController} - Instancia del controlador
 */
class UpdateRolPermisosController {

    constructor(service = new UpdateRolPermisosService()) {
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
            const result = await this.service.execute(id, req.body);
            res.json({data: result.data, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateRolPermisosController;