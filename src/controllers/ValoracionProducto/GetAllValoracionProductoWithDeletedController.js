import GetAllValoracionProductoService from '../../services/ValoracionProducto/GetAllValoracionProductoService.js';
import { handleError } from "../../shared/functions.js";


/**
 *  Controlador encargado de retornar todas las valoraciones de un producto  de la base de datos incluyendo los eliminados
 * @class
 * @param {GetAllValoracionProductoService} service - Servicio para obtener todos los registros de la base de datos
 * @returns {GetAllValoracionProductoWithDeletedController} - Instancia del controlador 
 * @description - Controlador encargado de retornar todo los menús registrados en la base de datos
 */
class GetAllValoracionProductoWithDeletedController{
    constructor(service = new GetAllValoracionProductoService()){
        this.service = service;
    }

    /**
     * Retorn todas las valoraciones de un producto de la base de datos incluyendo los eliminados.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función es el endpoint que maneja la obtención de todas las valoraciones de un producto de la base de datos  incluyendo los eliminados.
     * */
    execute = async (req, res) => {
    try {
        const data = await this.service.execute(false);
        res.json(data);
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

}

export default GetAllValoracionProductoWithDeletedController;