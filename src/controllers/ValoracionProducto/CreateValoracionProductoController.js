import CreateValoracionProductoService from '../../services/ValoracionProducto/CreateValoracionProductoService.js';
import ValoracionProductoRepository from "../../repositories/ValoracionProductoRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para crear una nueva valoración de producto
 * @class CreateValoracionProductoController
 */
class CreateValoracionProductoController {
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de valoraciones de productos
     */
    constructor(repository = new ValoracionProductoRepository()) {
        this.service = new CreateValoracionProductoService(repository);
    }

    /**
     * Ejecuta la creación de una nueva valoración de producto
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Promise<void>}
     */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute(req.body);
            res.json({ data, mensaje: 'El registro ha sido creado exitosamente.' });
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default CreateValoracionProductoController;