import CreateTipoDimensionesService from '../../services/tipoDimensiones/CreateTipoDimensionesService.js';
import TipoDimensionesRepository from '../../repositories/TipoDimensionesRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear un nuevo tipo de dimensión
 * @class CreateTipoDimensionesController
 */
class CreateTipoDimensionesController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de tipos de dimensión
     */
    constructor(repository = new TipoDimensionesRepository()) {
        this.service = new CreateTipoDimensionesService(repository);
    }

    /**
     * Maneja la petición para crear un nuevo tipo de dimensiones
      * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try {
            const { nombre, nombre_corto } = req.body;
            const data = await this.service.execute({ nombre, nombre_corto });
            res.json({ data, mensaje: 'El registro ha sido creado exitosamente.' });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default CreateTipoDimensionesController;