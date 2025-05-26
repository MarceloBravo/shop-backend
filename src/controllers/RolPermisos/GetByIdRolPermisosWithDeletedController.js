import GetByIdRolPermisosService from "../../services/RolPermisos/GetByIdRolPermisosService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un registro de permiso de rol por ID incluyendo eliminados
 * @class
 * @param {GetByIdRolPermisosService} service - Servicio para obtener un registro de permiso de rol por ID
 * @returns {GetByIdRolPermisosWithDeletedController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para obtener un registro de permiso de rol por ID incluyendo eliminados.
 */
class GetByIdRolPermisosWithDeletedController {    constructor(service = new GetByIdRolPermisosService()) {
        this.service = service;
    }

    /**
     * Obtiene un registro de permiso de rol por ID incluyendo eliminados
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @param {string} req.params.id - ID del permiso de rol a buscar
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id, false);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdRolPermisosWithDeletedController;
