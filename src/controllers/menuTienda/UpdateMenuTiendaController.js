import UpdateMenuTiendaService from "../../services/menuTienda/UpdateMenuTiendaService.js";
import MenuTiendaRepository from '../../repositories/MenuTiendaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para actualizar un registro de menú
 * @class UpdateMenuTiendaController
 */
class UpdateMenuTiendaController{
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de menús asociados a la tienda
     */
    constructor(repository = new MenuTiendaRepository()){
        this.service = new UpdateMenuTiendaService(repository);
    }

    /**
     * Actualiza un registro de menú de la tienda en la base de datos.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación.
     */
    execute = async (req, res) => {
        try{
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({data: result.data, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateMenuTiendaController;