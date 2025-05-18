import CreateMarcaService from "../../services/marca/CreateMarcaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear un nuevo registro de marca
 * @class
 * @param {CreateMarcaService} service - Servicio para crear un nuevo registro de marca
 * @returns {CreateMarcaController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la creación de nuevas marcas en la base de datos.
 */
class CreateMarcaController{
    constructor(service = new CreateMarcaService()){
        this.service = service;
    }   
    /**
     * Crea una nueva marca en la base de datos.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación.
     */
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

export default CreateMarcaController;