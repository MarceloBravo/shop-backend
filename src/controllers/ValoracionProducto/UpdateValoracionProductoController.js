import UpdateValoracionProductoService from "../../services/ValoracionProducto/UpdateValoracionProductoService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar una valoración de producto
 * @class UpdateValoracionProductoController
 */
class UpdateValoracionProductoController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de valoraciones de productos
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new UpdateValoracionProductoService(repository);
    }

    /**
     * Ejecuta la actualización de una valoración de producto
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({valoracion: result.data, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`});
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateValoracionProductoController;