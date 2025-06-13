import GetByIdRolPermisosService from "../../services/RolPermisos/GetByIdRolPermisosService.js";
import RolPermisosRepository from '../../repositories/RolPermisosRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un permiso de rol por su ID incluyendo los eliminados
 * @class GetByIdRolPermisosWithDeletedController
 */
class GetByIdRolPermisosWithDeletedController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de permisos de rol
     */
    constructor(repository = new RolPermisosRepository()) {
        this.service = new GetByIdRolPermisosService(repository);
    }

    /**
     * Ejecuta la obtención de un permiso de rol por su ID incluyendo los eliminados
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
