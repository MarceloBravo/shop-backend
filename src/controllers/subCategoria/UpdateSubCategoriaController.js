import UpdateSubCategoriaService from "../../services/subCategoria/UpdateSubCategoriaService.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador encargado de actualizar una subcategoría
 * @class
 * @param {UpdateSubCategoriaService} service - Servicio para actualizar una subcategoría
 * @returns {UpdateSubCategoriaController} - Instancia del controlador
 */
class UpdateSubCategoriaController{
    constructor(service = new UpdateSubCategoriaService()){
        this.service = service;
    }

    /**
     * Actualiza una subcategoría existente.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función maneja la actualización de una subcategoría existente.
     * */
    execute = async (req, res) => {
        try{
            const { id } = req.params;
            const { data, created } = await this.service.execute(id, req.body);
            const mensaje = created ? 'El registro ha sido recuperado exitosamente.' : 'El registro ha sido actualizado exitosamente.';
            res.json({ data, mensaje });
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateSubCategoriaController;