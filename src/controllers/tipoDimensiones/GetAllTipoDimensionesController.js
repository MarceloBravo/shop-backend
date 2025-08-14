import GetAllTipoDimensionesService from '../../services/tipoDimensiones/GetAllTipoDimensionesService.js';
import TipoDimensionesRepository from '../../repositories/TipoDimensionesRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener todos los tipos de dimensión
 * @class GetAllTipoDimensionesController
 */
class GetAllTipoDimensionesController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tipos de dimensión
     */
    constructor(repository = null) {
        if (!repository) {
            repository = new TipoDimensionesRepository()
        }
        this.service = new GetAllTipoDimensionesService(repository);
    }

    /**
     * Maneja la petición para obtener todos los tipos de dimensiones
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función maneja la obtención de todos los registros activos.
     * */
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

export default GetAllTipoDimensionesController;