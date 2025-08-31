import GetByIdRolService from "../../services/Rol/GetByIdRolService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un rol por su ID
 * @class GetByIdRolController
 */
class GetByIdRolController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de roles
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new GetByIdRolService(repository);
    }

    /**
     * Ejecuta la obtención de un rol por su ID
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
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

export default GetByIdRolController;