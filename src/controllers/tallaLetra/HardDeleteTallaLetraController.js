import HardDeleteTallaLetraService from '../../services/tallaLetra/HardDeleteTallaLetraService.js';
import TallaLetraRepository from '../../repositories/TallaLetraRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado físico de una talla letra
 * @class HardDeleteTallaLetraController
 */
class HardDeleteTallaLetraController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tallas letra
     */
    constructor(repository) {
        if(!repository) {
            repository = new TallaLetraRepository()
        }
        this.service = new HardDeleteTallaLetraService(repository);
    }

    /**
     * Ejecuta el borrado físico de una talla letra
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            await this.service.execute(id);
            res.json({
                id,
                mensaje: 'El registro ha sido eliminado permanentemente.'
            });
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteTallaLetraController;
