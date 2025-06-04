import CreateColorService from "../../services/color/CreateColorService.js";
import ColorRepository from "../../repositories/ColorRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear un nuevo color
 * @class CreateColorController
 */
class CreateColorController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de colores
     */
    constructor(repository = new ColorRepository()) {
        this.service = new CreateColorService(repository);
    }

    /**
     * Ejecuta la creación de un nuevo color
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    async execute(req, res) {
        try {
            const {nombre, valor} = req.body;
            const resp = await this.service.execute({nombre, valor});
            res.json({data: resp, mensaje: 'El registro ha sido creado exitosamente.'});
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}   

export default CreateColorController;