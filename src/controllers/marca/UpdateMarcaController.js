import UpdateMarcaService from "../../services/marca/UpdateMarcaService.js";
import MarcaRepository from "../../repositories/MarcaRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar una marca
 * @class UpdateMarcaController
 */
class UpdateMarcaController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de marcas
     */
    constructor(repository = new MarcaRepository()) {
        this.service = new UpdateMarcaService(repository);
    }

    /**
     * Ejecuta la actualización de una marca
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({
                marca: result.marca,
                mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`
            });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateMarcaController;