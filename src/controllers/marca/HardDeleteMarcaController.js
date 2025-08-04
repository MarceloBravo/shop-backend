import HardDeleteMarcaService from '../../services/marca/HardDeleteMarcaService.js';
import MarcaRepository from "../../repositories/MarcaRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para eliminar una marca de forma permanente
 * @class HardDeleteMarcaController
 */
class HardDeleteMarcaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de marcas
     */
    constructor(repository = null) {
        if(!repository){
            repository = new MarcaRepository();
        }
        this.service = new HardDeleteMarcaService(repository);
    }

    /**
     * Ejecuta la eliminación permanente de una marca
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {
                id,
                code: result ? 200 : 500,
                mensaje: result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no pudo ser eliminado o registro inexistente'
            };
            res.json(resp);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteMarcaController;