import HardDeleteTallaNumeroService from '../../services/tallaNumero/HardDeleteTallaNumeroService.js';
import TallaNumeroRepository from '../../repositories/TallaNumeroRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado físico de una talla numérica
 * @class HardDeleteTallaNumeroController
 */
class HardDeleteTallaNumeroController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tallas numéricas
     */
    constructor(repository = new TallaNumeroRepository()) {
        this.service = new HardDeleteTallaNumeroService(repository);
    }

    /**
     * Ejecuta el borrado físico de una talla numérica
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no pudo ser eliminado o registro inexistente';
            res.json({ id, code: result ? 200 : 500, mensaje });
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteTallaNumeroController;