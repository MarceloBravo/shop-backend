import GetByIdMenuService from '../../services/menu/GetByIdMenuService.js';
import MenuRepository from "../../repositories/MenuRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un menú por su ID
 * @class GetByIdMenuController
 */
class GetByIdMenuController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de menús
     */
    constructor(repository = new MenuRepository()) {
        this.service = new GetByIdMenuService(repository);
    }

    /**
     * Ejecuta la obtención de un menú por su ID
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try{
            const { id } = req.params
            const data = await this.service.execute(id)
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdMenuController;
