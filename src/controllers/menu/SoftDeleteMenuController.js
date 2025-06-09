import SoftDeleteMenuService from "../../services/menu/SoftDeleteMenuService.js";
import MenuRepository from "../../repositories/MenuRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado lógico de un menú
 * @class SoftDeleteMenuController
 */
class SoftDeleteMenuController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de menús
     */
    constructor(repository = new MenuRepository()) {
        this.service = new SoftDeleteMenuService(repository);
    }

    /**
     * Marca un registro de menú como eliminado en la base de datos.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación.
     */
    execute = async (req, res) => {
        try{
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {code: result, mensaje: result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente'};
            res.json(resp);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteMenuController;