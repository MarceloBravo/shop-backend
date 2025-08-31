import HardDeleteRolPermisosService from '../../services/RolPermisos/HardDeleteRolPermisosService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado físico de un permiso de rol
 * @class HardDeleteRolPermisosController
 */
class HardDeleteRolPermisosController {
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
        this.service = new HardDeleteRolPermisosService(repository);
    }

    /**
     * Ejecuta el borrado físico de un permiso de rol
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
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