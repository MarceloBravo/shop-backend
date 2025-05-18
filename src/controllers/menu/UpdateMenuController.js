import UpdateMenuService from "../../services/menu/UpdateMenuService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar un registro de menú
 * @class
 * @param {UpdateMarcaService} service - Servicio para actualizar un registro de marca
 * @returns {UpdateMarcaController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para actualizar un registro de menú.
 */
class UpdateMenuController{
    constructor(service = new UpdateMenuService()){
        this.service = service;
    }

    /**
     * Actualiza un registro de menú en la base de datos.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación.
     */
    execute = async (req, res) => {
        try{
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({menu: result.data, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateMenuController;