import GetAllMarcaService from '../../services/marca/GetAllMarcaService.js';
import MarcaRepository from "../../repositories/MarcaRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todas las marcas
 * @class GetAllMarcaController
 */
class GetAllMarcaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de marcas
     */
    constructor(repository = null) {
        if(!repository){
            repository = new MarcaRepository();
        }
        this.service = new GetAllMarcaService(repository);
    }

    /**
     * Ejecuta la obtención de todas las marcas
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute();
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllMarcaController;

