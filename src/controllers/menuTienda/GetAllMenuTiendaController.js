import GetAllMenuTiendaService from '../../services/menuTienda/GetAllMenuTiendaService.js';
import { handleError } from "../../shared/functions.js";

/**
 *  Controlador encargado de retornar  todos los menús de la tienda en la base de datos
 * @class GetAllMenuTiendaController
 */
class GetAllMenuTiendaController{
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de menús asociados a la tienda
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new GetAllMenuTiendaService(repository);
    }

    /**
     * Retorn todos los menús de la tienda en la base de datos.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función es el endpoint que maneja la obtención de todos los menús de la tienda en la base de datos.
     * */
    execute = async (req, res) => {
        try{
            const data = await this.service.execute();
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllMenuTiendaController;

