import GetByIdMenuService from '../../services/menu/GetByIdMenuService.js';
import { handleError } from "../../shared/functions.js";


/**
 * Controlador para obtener un registro de menú por su ID
 * @class
 * @param {GetByIdGeneroService} service - Servicio para obtener un registro de género por su ID
 * @returns {GetByIdMenuController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para obtener un registro de menú por su ID.
 * */
class GetByIdMenuController{

    constructor(service = new GetByIdMenuService()){
        this.service = service;
    }

    /**
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Promesa que se resuelve cuando se envía la respuesta
     */
    execute = async (req, res) => {
        try{
            const { id } = req.params
            const data = await this.service.execute(id)
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdMenuController;
