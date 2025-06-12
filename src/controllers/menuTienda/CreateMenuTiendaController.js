import CreateMenuTiendaService from "../../services/menuTienda/CreateMenuTiendaService.js";
import MenuTiendaRepository from '../../repositories/MenuTiendaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 *  Controlador encargado de la creación de un menú de la tienda en la base de datos
 * @class CreateMenuTiendaController
 */
class CreateMenuTiendaController{
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de menús
     */
    constructor(repository = new MenuTiendaRepository()){
        this.service = new CreateMenuTiendaService(repository);
    }

    /**
     * Crea un nuevo menú de la tienda en la base de datos.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función maneja la creación de un nuevo menú de la tienda en la base de datos.
     * */
    execute = async (req, res) => {
        try{
            const data = await this.service.execute(req.body);
            res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }   
    }
}

export default CreateMenuTiendaController;