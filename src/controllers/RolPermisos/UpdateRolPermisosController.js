import UpdateRolPermisosService from "../../services/RolPermisos/UpdateRolPermisosService.js";
import RolPermisosRepository from '../../repositories/RolPermisosRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar un permiso de rol
 * @class UpdateRolPermisosController
 */
class UpdateRolPermisosController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de permisos de rol
     */
    constructor(repository = new RolPermisosRepository()) {
        this.service = new UpdateRolPermisosService(repository);
    }

    /**
     * Ejecuta la actualización de un permiso de rol
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
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