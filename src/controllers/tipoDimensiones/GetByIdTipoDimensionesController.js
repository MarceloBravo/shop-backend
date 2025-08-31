import GetByIdTipoDimensionesService from "../../services/tipoDimensiones/GetByIdTipoDimensionesService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un tipo de dimensión por su ID
 * @class GetByIdTipoDimensionesController
 */
class GetByIdTipoDimensionesController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tipos de dimensión
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new GetByIdTipoDimensionesService(repository);
    }

    /**
     * Obtiene un tipo de dimensión por ID.
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
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

export default GetByIdTipoDimensionesController;
