import CreateValoracionProductoService from '../../services/ValoracionProducto/CreateValoracionProductoService.js';
import { handleError } from "../../shared/functions.js";

/**
 *  Controlador encargado de registrar una valoración de un producto
 * @class
 * @param {CreateValoracionProductoService} service - Servicio para registrar una nueva valoración de un producto
 * @returns {CreateValoracionProductoController} - Instancia del controlador 
 */
class CreateValoracionProductoController{
    constructor(service = new CreateValoracionProductoService()){
        this.service = service;
    }

    /**
     * Crea una nueva valoración de un producto en la base de datos.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función maneja la creación de una nueva valoración de un producto en la base de datos.
     * */
    execute = async (req, res) => {
        try {
            const data = await this.service.execute(req.body);
            res.json({ data, mensaje: 'El regístro ha sido creado exitosamente.' });
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }   

}


export default CreateValoracionProductoController;