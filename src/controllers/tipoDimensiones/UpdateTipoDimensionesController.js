import UpdateTipoDimensionesService from '../../services/tipoDimensiones/UpdateTipoDimensionesService.js';
import TipoDimensionesRepository from '../../repositories/TipoDimensionesRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar un tipo de dimensión
 * @class UpdateTipoDimensionesController
 */
class UpdateTipoDimensionesController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tipos de dimensión
     */
    constructor(repository = null) {
        if (!repository) {
            repository = new TipoDimensionesRepository()
        }
        this.service = new UpdateTipoDimensionesService(repository);
    }

    /**
     * Maneja la petición para actualizar un tipo de dimensiones
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({
                data: result.data,
                mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`
            });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateTipoDimensionesController; 