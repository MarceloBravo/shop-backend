import HardDeletePantallaService from '../../services/pantalla/HardDeletePantallaService.js';
import { handleError } from "../../shared/functions.js";


/**
 *  Controlador encargado de la eliminación de una pantalla en la base de datos
 * @class HardDeletePantallaController
 * @param {HardDeletePantallaService} service - Servicio para crear un nuevo registro
 * @returns {HardDeletePantallaController} - Instancia del controlador 
 * @description - Elimina una pantalla de la base de datos.
 */
class HardDeletePantallaController{
    constructor(service = new HardDeletePantallaService()){
        this.service = service;
    }

    /**
     * Elimina una pantalla en la base de datos.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Devuelve una respuesta JSON con el resultado de la operación.
     * */
    execute = async (req, res) => {
        try{
            const { id } = req.params
            const {result } = await this.service.execute(id);
            const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminado o registro inexistente';  
            res.json({ id, code: result ? 200 : 500, mensaje });
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }

}

export default HardDeletePantallaController;