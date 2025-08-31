import GetByIdRolPermisosService from "../../services/RolPermisos/GetByIdRolPermisosService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un permiso de rol por su ID
 * @class GetByIdRolPermisosController
 */
class GetByIdRolPermisosController {
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
        this.service = new GetByIdRolPermisosService(repository);
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