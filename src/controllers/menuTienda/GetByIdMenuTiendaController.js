import GetByIdMenuTiendaService from '../../services/menuTienda/GetByIdMenuTiendaService.js';
import MenuTiendaRepository from '../../repositories/MenuTiendaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un registro de menú por su ID
 * @class GetByIdMenuTiendaController
 * */
class GetByIdMenuTiendaController{
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de menús asociados a la tienda
     */
    constructor(repository = new MenuTiendaRepository()){
        this.service = new GetByIdMenuTiendaService(repository);
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

export default GetByIdMenuTiendaController;
