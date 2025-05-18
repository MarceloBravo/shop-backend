import GetAllMenuService from '../../services/menu/GetAllMenuService.js';
import { handleError } from "../../shared/functions.js";

/**
 *  Controlador encargado de retornar  todos los menús de la base de datos incluyendo los registros eliminados.
 * @class
 * @param {GetAllMenuService} service - Servicio para obtener todos los registros de la base de datos
 * @returns {GetAllMenuWithDeletedController} - Instancia del controlador 
 * @description - Controlador encargado de retornar todo los menús registrados en la base de datos inlcuidos los marcados con soft-deleted
 */
class GetAllMenuWithDeletedController{

    constructor(service = new GetAllMenuService()){
        this.service = service;
    }

    /**
     * Retorn todos los menus de la base de datos incluidos los eliminados
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función es el endpoint que maneja la obtención de todos los menús de la base de datos, incluidos los eliminados.
     * */
    execute = async (req, res) => {
        try{
            const data = await this.service.execute(false);
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllMenuWithDeletedController;

