import UpdateValoracionProductoService from "../../services/ValoracionProducto/UpdateValoracionProductoService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar un registro de una valoración de un producto
 * @class
 * @param {Updateuna valoración de un productoService} service - Servicio para actualizar un registro de una valoración de un producto
 * @returns {Updateuna valoración de un productoController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para actualizar un registro de una valoración de un producto.
 */
class UpdateValoracionProductoController{
    constructor(service = new UpdateValoracionProductoService()){
        this.service = service;
    }

    /**
     * Actualiza un registro de una valoración de un producto en la base de datos.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación.
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({color: result.color, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }

}


export default UpdateValoracionProductoController;