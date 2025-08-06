import GetByIdMenuService from '../../services/menu/GetByIdMenuService.js';
import MenuRepository from "../../repositories/MenuRepository.js";
import { handleError } from "../../shared/functions.js";


/**
 * Controlador para obtener un registro de menú por su ID
 * @class
 * @param {GetByIdGeneroService} service - Servicio para obtener un registro de género por su ID
 * @returns {GetByIdMenuWithDeletedController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para obtener un registro de menú por su ID.
 * */
class GetByIdMenuWithDeletedController{

    constructor(repository) {
        if(!repository) {
            repository = new MenuRepository()
        }
        this.service = new GetByIdMenuService(repository);
    }

    /**
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación.
     */
    execute = async (req, res) => {
        try{
            const { id } = req.params
            const data = await this.service.execute(id, false)
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdMenuWithDeletedController;
