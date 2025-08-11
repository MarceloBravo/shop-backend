import CreateTallaLetraService from '../../services/tallaLetra/CreateTallaLetraService.js';
import TallaLetraRepository from '../../repositories/TallaLetraRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear una nueva talla letra
 * @class CreateTallaLetraController
 */
class CreateTallaLetraController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tallas letra
     */
    constructor(repository) {
        if(!repository) {
            repository = new TallaLetraRepository()
        }
        this.service = new CreateTallaLetraService(repository);
    }

    /**
     * Ejecuta la creación de una nueva talla letra
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

export default CreateTallaLetraController;