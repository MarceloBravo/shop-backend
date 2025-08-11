import UpdateTallaLetraService from '../../services/tallaLetra/UpdateTallaLetraService.js';
import TallaLetraRepository from '../../repositories/TallaLetraRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar una talla letra
 * @class UpdateTallaLetraController
 */
class UpdateTallaLetraController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tallas letra
     */
    constructor(repository) {
        if(!repository) {
            repository = new TallaLetraRepository()
        }
        this.service = new UpdateTallaLetraService(repository);
    }

    /**
     * Ejecuta la actualización de una talla letra
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({
                data: result.data, 
                mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`
            });
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateTallaLetraController;