import GetByIdRolPermisosService from "../../services/RolPermisos/GetByIdRolPermisosService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un permiso de rol por su ID
 * @class
 * @param {GetByIdRolPermisosService} service - Servicio para obtener un permiso de rol por su ID
 * @returns {GetByIdRolPermisosController} - Instancia del controlador
 */
class GetByIdRolPermisosController {

    constructor(service = new GetByIdRolPermisosService()) {
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
            const data = await this.service.execute(id);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdRolPermisosController;