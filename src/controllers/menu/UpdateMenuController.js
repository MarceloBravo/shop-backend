import UpdateMenuService from "../../services/menu/UpdateMenuService.js";
import MenuRepository from "../../repositories/MenuRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar un menú
 * @class UpdateMenuController
 */
class UpdateMenuController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de menús
     */
    constructor(repository = new MenuRepository()) {
        this.service = new UpdateMenuService(repository);
    }

    /**
     * Actualiza un registro de menú en la base de datos.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación.
     */
    execute = async (req, res) => {
        try{
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({menu: result.data, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`});
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateMenuController;