import GetByIdMarcaService from '../../services/marca/GetByIdMarcaService.js';
import MarcaRepository from "../../repositories/MarcaRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una marca por su ID
 * @class GetByIdMarcaController
 */
class GetByIdMarcaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de marcas
     */
    constructor(repository = new MarcaRepository()) {
        this.service = new GetByIdMarcaService(repository);
    }

    /**
     * Ejecuta la obtención de una marca por su ID
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id);
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdMarcaController;
