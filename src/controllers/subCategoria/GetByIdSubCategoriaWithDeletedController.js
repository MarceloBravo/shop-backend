import GetByIdSubCategoriaService from "../../services/subCategoria/GetByIdSubCategoriaService.js";
import SubCategoriaRepository from "../../repositories/SubCategoriaRepository.js";
import { handleError } from "../../shared/functions.js";

/**
 * Controlador encargado de obtener una subcategoría por su ID incluyendo registros eliminados
 * @class GetByIdSubCategoriaWithDeletedController
 */
class GetByIdSubCategoriaWithDeletedController{
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de subcategorías
     */
    constructor(repository) {
        if(!repository){
            repository = new SubCategoriaRepository();
        }
        this.service = new GetByIdSubCategoriaService(repository);
    }

    /**
     * Obtiene una subcategoría por su ID incluyendo registros eliminados.
     * @param {Object} req - Objeto de solicitud.
     * @param {Object} res - Objeto de respuesta.
     * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación.
     * @description Esta función maneja la obtención de una subcategoría por su ID incluyendo registros eliminados.
     * */
    execute = async (req, res) => {
        try{
            const data = await this.service.execute(req.params.id, false);
            if(!data) return res.status(404).json({mensaje: 'Registro no encontrado'});
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdSubCategoriaWithDeletedController;
