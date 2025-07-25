import UpdatePantallaService from "../../services/pantalla/UpdatePantallaService.js";
import PantallaRepository from '../../repositories/PantallaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar una pantalla
 * @class UpdatePantallaController
 */
class UpdatePantallaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de pantallas
     */
    constructor(repository = new PantallaRepository()) {
        this.service = new UpdatePantallaService(repository);
    }

    /**
     * Actualiza una pantalla en la base de datos
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({pantalla: result.data, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`});
        } catch(e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default UpdatePantallaController;