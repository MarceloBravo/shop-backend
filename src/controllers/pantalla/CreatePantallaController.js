import CreatePantallaService from "../../services/pantalla/CreatePantallaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear una nueva pantalla
 * @class CreatePantallaController
 */
class CreatePantallaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de pantallas
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new CreatePantallaService(repository);
    }

    /**
     * Crea una nueva pantalla en la base de datos
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación
     */
    execute = async (req, res) => {
        try {        
            const data = await this.service.execute(req.body);
            res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default CreatePantallaController;