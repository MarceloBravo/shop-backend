import SoftDeleteMenuTiendaService from "../../services/menuTienda/SoftDeleteMenuTiendaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para eliminar un registro de menú con borrado suave
 * @class SoftDeleteMenuTiendaController
 */
class SoftDeleteMenuTiendaController{
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de menús asociados a la tienda
     */
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new SoftDeleteMenuTiendaService(repository);
    }

    /**
     * Marca un registro de menú como eliminado en la base de datos.
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

export default SoftDeleteMenuTiendaController;