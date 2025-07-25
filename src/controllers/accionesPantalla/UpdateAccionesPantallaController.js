import UpdateAccionesPantallaService from "../../services/accionesPantalla/UpdateAccionesPantallaService.js";
import AccionesPantallaRepository from "../../repositories/AccionesPantallaRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar una acción de pantalla
 * @class UpdateAccionesPantallaController
 */
class UpdateAccionesPantallaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de acciones de pantalla
     */
    constructor(repository = new AccionesPantallaRepository()) {
        this.service = new UpdateAccionesPantallaService(repository);
    }
    
    /**
     * Ejecuta la actualización de una acción de pantalla
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
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateAccionesPantallaController;