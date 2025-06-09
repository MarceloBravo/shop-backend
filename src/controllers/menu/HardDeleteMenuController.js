import HardDeleteMenuService from '../../services/menu/HardDeleteMenuService.js';
import MenuRepository from "../../repositories/MenuRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para realizar borrado físico de un menú
 * @class HardDeleteMenuController
 */
class HardDeleteMenuController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de menús
     */
    constructor(repository = new MenuRepository()) {
        this.service = new HardDeleteMenuService(repository);
    }

    /**
     * Elimina un menú en la base de datos.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función corresponde al endpoint que maneja la eliminación de un menú en la base de datos.
     * */
    execute = async (req, res) => {
        try{
            const { id } = req.params;
            const result = await this.service.execute(id);
            const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminado o registro inexistente';
            res.json({ id, code: result ? 200 : 500, mensaje });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteMenuController;