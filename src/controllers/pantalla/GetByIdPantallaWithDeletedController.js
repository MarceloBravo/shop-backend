import GetByIdPantallaService from '../../services/pantalla/GetByIdPantallaService.js';
import PantallaRepository from '../../repositories/PantallaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un registro por su ID
 * @class GetByIdPantallaWithDeletedController
 * */
class GetByIdPantallaWithDeletedController{
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de pantallas
     */
    constructor(repository = new PantallaRepository()) {
        this.service = new GetByIdPantallaService(repository);
    }

     /**
     * Retorna el regístro de una pantalla por su ID.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Devuelve una respuesta JSON con el resultado de la operación.
     * */
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

export default GetByIdPantallaWithDeletedController;
