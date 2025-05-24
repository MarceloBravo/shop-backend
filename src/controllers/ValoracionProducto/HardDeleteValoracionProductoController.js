import HardDeleteValoracionProductoService from '../../services/ValoracionProducto/HardDeleteValoracionProductoService.js';
import { handleError } from "../../shared/functions.js";

/**
 *  Controlador encargado de la eliminación de una valoración de un producto  en la base de datos
 * @class
 * @param {CreateMenuService} service - Servicio para crear un nuevo registro de género
 * @returns {CreateMenuController} - Instancia del controlador 
 * @description - Elimina una valoración de un producto de la base de datos.
 */
class HardDeleteValoracionProductoController{
    constructor(service = new HardDeleteValoracionProductoService()){
        this.service = service;
    }

    /**
     * Elimina una valoración de un producto  en la base de datos.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función corresponde al endpoint que maneja la eliminación de una valoración de un producto de la base de datos.
     * */
    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const { result } = await this.service.execute(id);
            const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminar o registro inexistente';  
            res.json({ id, code: result ? 200 : 500, mensaje });
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}


export default HardDeleteValoracionProductoController;