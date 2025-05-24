import SoftDeleteValoracionProductoService from "../../services/ValoracionProducto/SoftDeleteValoracionProductoService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para eliminar un registro de una valoración de un producto con borrado suave
 * @class
 * @param {SoftDeleteValoracionProductoService} service - Servicio para eliminar un registro de una valoración de un producto
 * @returns {SoftDeleteValoracionProductoController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para eliminar un registro de una valoración de un producto con borrado suave.
 */
class SoftDeleteValoracionProductoController{
    constructor(service = new SoftDeleteValoracionProductoService()){
        this.service = service;
    }

    /**
     * Marca un registro de una valoración de un producto como eliminado en la base de datos.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación.
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const  result  = await this.service.execute(id);
            const resp = {code: result, mensaje : result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente' };
            res.json(resp);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}


export default SoftDeleteValoracionProductoController;