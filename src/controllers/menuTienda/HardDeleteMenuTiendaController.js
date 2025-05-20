import HardDeleteMenuTiendaService from '../../services/menuTienda/HardDeleteMenuTiendaService.js';
import { handleError } from "../../shared/functions.js";

/**
 *  Controlador encargado de la eliminación de un menú de la tienda en la base de datos
 * @class
 * @param {CreateMenuTiendaService} service - Servicio para crear un nuevo registro de género
 * @returns {CreateMenuTiendaController} - Instancia del controlador 
 * @description - Elimina un  menú de la base de datos.
 */
class HardDeleteMenuTiendaController{
    constructor(service = new HardDeleteMenuTiendaService()){
        this.service = service;
    }

    /**
     * Elimina un menú de la tienda en la base de datos.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función corresponde al endpoint que maneja la eliminación de un menú de la tienda en la base de datos.
     * */
    execute = async (req, res) => {
        try{
            const { id } = req.params;
            const result = await this.service.execute(id)
            const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminado o registro inexistente';  
            res.json({ id, code: result ? 200 : 500, mensaje });
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteMenuTiendaController;