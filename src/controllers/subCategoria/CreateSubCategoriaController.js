import CreateSubCategoriaService from "../../services/subCategoria/CreateSubCategoriaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador encargado de la creación de una subcategoría en la base de datos
 * @class
 * @param {CreateSubCategoriaService} service - Servicio para crear una nueva subcategoría
 * @returns {CreateSubCategoriaController} - Instancia del controlador 
 */
class CreateSubCategoriaController{
    constructor(service = new CreateSubCategoriaService()){
        this.service = service;
    }

    /**
     * Crea una nueva subcategoría en la base de datos.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función maneja la creación de una nueva subcategoría en la base de datos.
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

export default CreateSubCategoriaController;