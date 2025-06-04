import CreateMaterialService from "../../services/materiales/CreateMaterialService.js";
import MaterialRepository from "../../repositories/MaterialRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear un nuevo material
 * @class CreateMaterialController
 */
class CreateMaterialController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de materiales
     */
    constructor(repository = new MaterialRepository()) {
        this.service = new CreateMaterialService(repository);
    }

    /**
     * Ejecuta la creación de un nuevo material
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {        
            const data = await this.service.execute(req.body);
            res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default CreateMaterialController;