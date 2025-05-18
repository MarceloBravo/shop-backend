import CreateMenuService from "../../services/menu/CreateMenuService.js";
import { handleError } from "../../shared/functions.js";

/**
 *  Controlador encargado de la creación de un menú en la base de datos
 * @class
 * @param {CreateMenuService} service - Servicio para crear un nuevo registro de género
 * @returns {CreateMenuController} - Instancia del controlador 
 */
class CreateMenuController{
    constructor(service = new CreateMenuService()){
        this.service = service;
    }

    /**
     * Crea un nuevo menú en la base de datos.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función maneja la creación de un nuevo menú en la base de datos.
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

export default CreateMenuController;