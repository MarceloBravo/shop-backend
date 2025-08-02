import HardDeleteGeneroService from '../../services/genero/HardDeleteGeneroService.js';
import GeneroRepository from '../../repositories/GeneroRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado físico de un registro de género
 * @class HardDeleteGeneroController
 */
class HardDeleteGeneroController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de géneros
     */
    constructor(repository = null) {
        if(!repository){
            repository = new GeneroRepository();
        }
        this.service = new HardDeleteGeneroService(repository);
    }

    /**
     * Ejecuta el borrado físico de un registro de género
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const {result} = await this.service.execute(id);
            const mensaje = result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente';  
            res.json({ id, code: result ? 200 : 500, mensaje });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteGeneroController;