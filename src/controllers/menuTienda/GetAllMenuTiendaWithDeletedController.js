import GetAllMenuTiendaService from '../../services/menuTienda/GetAllMenuTiendaService.js';
import MenuTiendaRepository from '../../repositories/MenuTiendaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 *  Controlador encargado de retornar  todos los menús de la tienda en la base de datos incluyendo los registros eliminados.
 * @class GetAllMenuWithDeletedController
 */
class GetAllMenuWithDeletedController{
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de menús asociados a la tienda
     */
    constructor(repository = new MenuTiendaRepository()){
        this.service = new GetAllMenuTiendaService(repository);
    }

    /**
     * Retorn todos los menús de la tienda en la base de datos incluidos los eliminados
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función es el endpoint que maneja la obtención de todos los menús de la tienda en la base de datos, incluidos los eliminados.
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

