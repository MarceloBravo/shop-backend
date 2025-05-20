import SoftDeletePantallaService from "../../services/pantalla/SoftDeletePantallaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para marcar un regístro como eliminado con borrado suave
 * @class SoftDeletePantallaController
 * @param {SoftDeleteMarcaService} service - Servicio para eliminar para acceder al repositorio
 * @returns {SoftDeletePantallaController} - Instancia del controlador
 * @description Este controlador se encarga de manejar la lógica para eliminar un registro con borrado suave.
 */
class SoftDeletePantallaController{
    constructor(service = new SoftDeletePantallaService()){
        this.service = service;
    }

    /**
     * Marca un registro como eliminado en la base de datos (soft-delete).
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación.
     */
    execute = async (req, res) => {
        try{
            const { id } = req.params;
            const result = await this.service.execute(id);
            const resp = {code: result, mensaje : result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente' };
            res.json(resp);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeletePantallaController;