import CreateTallaNumeroService from "../../services/tallaNumero/CreateTallaNumeroService.js";
import TallaNumeroRepository from "../../repositories/TallaNumeroRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear una nueva talla numérica
 * @class CreateTallaNumeroController
 */
class CreateTallaNumeroController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tallas numéricas
     */
    constructor(repository) {
        if(!repository) {
            repository = new TallaNumeroRepository()
        }
        this.service = new CreateTallaNumeroService(repository);
    }

    /**
     * Ejecuta la creación de una nueva talla numérica
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {        
            const data = await this.service.execute(req.body);
            res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default CreateTallaNumeroController;