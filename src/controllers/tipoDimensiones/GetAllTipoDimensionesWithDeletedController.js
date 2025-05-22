import GetAllTipoDimensionesService from '../../services/tipoDimensiones/GetAllTipoDimensionesService.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador encargado de obtener todos los registros activos (no eliminados con soft-delete)
 * @class GetAllTipoDimensionesWithDeletedController
 * @param {GetAllTipoDimensionesService} service - Servicio para obtener una subcategoría
 * @returns {GetAllTipoDimensionesWithDeletedController} - Instancia del controlador
 */
class GetAllTipoDimensionesWithDeletedController {
    constructor(service = new GetAllTipoDimensionesService()) {
        this.service = service;
    }

    /**
     * Maneja la petición para obtener todos los tipos de dimensiones
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función maneja la obtención de todos los registros activos.
     * */
    execute = async (req, res) => {
        try{
            const data = await this.service.execute(false);
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllTipoDimensionesWithDeletedController;