import CreatePantallaService from "../../services/pantalla/CreatePantallaService.js";
import { handleError } from "../../shared/functions.js";

/**
 *  Controlador encargado de la creación de una pantall en la base de datos
 * @class 
 * @param {CreatePantallaService} service - Servicio para crear un nuevo registro
 * @returns {CreatePantallaController} - Instancia del controlador 
 */
class CreatePantallaController{
    constructor(service = new CreatePantallaService()){
        this.service = service;
    }

    /**
     * Crea una nueva pantalla en la base de datos.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Devuelve una respuesta JSON con el resultado de la operación.
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

export default CreatePantallaController;