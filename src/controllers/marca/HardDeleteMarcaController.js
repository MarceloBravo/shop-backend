import HardDeleteMarcaService from '../../services/marca/HardDeleteMarcaService.js';
import { handleError } from "../../shared/functions.js";


/**
 * Controlador para eliminar un registro de marca de forma permanente
 * @class
 * @param {DeleteMarcaService} service - Servicio para eliminar un registro de marca
 * @returns {HardDeleteMarcaController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para eliminar un registro de marca de forma permanente.
 */
class HardDeleteMarcaController{
    constructor(service = new HardDeleteMarcaService()){
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
            const {id} = req.params;
            const result = await this.service.execute(id);
            const resp = {code: result, mensaje : result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminado o registro inexistente' };
            res.json(resp);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }   
}   

export default HardDeleteMarcaController;