import GetByIdValoracionProductoService from "../../services/ValoracionProducto/GetByIdValoracionProductoService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una valoración de un producto por su ID, incluidos los registros eliminados.
 * @class
 * @param {GetByIdValoracionProductoService} service - Servicio para obtener una valoración de un producto por su ID, incluidos los registros eliminados.
 * @returns {GetByIdValoracionProductoWithDeletedController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para obtener una valoración de un producto por su ID, incluidos los registros eliminados..
 */
class GetByIdValoracionProductoWithDeletedController{
    constructor(service = new GetByIdValoracionProductoService()){
        this.service = service;
    }

    /**
     * Obtiene una valoración de un producto por su ID, incluidos los registros eliminados.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación.
     */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id, false);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }

}

export default GetByIdValoracionProductoWithDeletedController;