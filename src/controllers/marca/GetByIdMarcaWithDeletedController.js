import MarcaRepository from '../../repositories/MarcaRepository.js';
import GetByIdMarcaService from '../../services/marca/GetByIdMarcaService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener un registro de marca por su ID
 * @class
 * @param {GetByIdMarcaService} service - Servicio para obtener un registro de marca por su ID
 * @returns {GetByIdMarcaController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para obtener un registro de marca por su ID.
 */
class GetByIdMarcaWithDeletedController{
    constructor(repository = new MarcaRepository()){
        this.service = new GetByIdMarcaService(repository);
    }  

    /**
     * Obtiene un registro de marca por su ID incluido los registros marcados como eliminados.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación.
     */
    execute = async (req, res) => {
        try{        
            const { id } = req.params;
            const data = await this.service.execute(id, false);
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdMarcaWithDeletedController;
