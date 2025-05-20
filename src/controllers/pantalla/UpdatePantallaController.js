import UpdatePantallaService from "../../services/pantalla/UpdatePantallaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar un registro de una pantalla
 * @class
 * @param {UpdateMarcaService} service - Servicio para actualizar un registro de pantalla
 * @returns {UpdateMarcaController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para actualizar un registro de una pantalla.
 */
class UpdatePantallaController{
    constructor(service = new UpdatePantallaService()){
        this.service = service;
    }

    /**
     * Actualiza un registro de una pantalla en la base de datos.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación.
     */
    execute = async (req, res) => {
        try{
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({pantalla: result.pantalla, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }

}

export default UpdatePantallaController;