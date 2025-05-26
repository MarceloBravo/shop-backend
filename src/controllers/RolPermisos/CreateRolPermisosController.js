import CreateRolPermisosService from '../../services/RolPermisos/CreateRolPermisosService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear un nuevo registro de permisos de rol
 * @class
 * @param {CreateRolPermisosService} service - Servicio para crear un nuevo registro de permisos de rol
 * @returns {CreateRolPermisosController} - Instancia del controlador
 */
class CreateRolPermisosController {

    constructor(service = new CreateRolPermisosService()) {
        this.service = service;
    }

    /**
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute(req.body);
            res.json({ data, mensaje: 'El registro ha sido creado exitosamente.' });
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }   
}

export default CreateRolPermisosController;