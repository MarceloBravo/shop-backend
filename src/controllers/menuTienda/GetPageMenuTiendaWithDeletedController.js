import GetPageMenuTiendaService from "../../services/menuTienda/GetPageMenuTiendaService.js";
import MenuTiendaRepository from '../../repositories/MenuTiendaRepository.js';
import { handleError } from "../../shared/functions.js";

/**
 * Controlador para obtener una página de registros de menús inlcuidos los registros marcados como eliminados.
 * @class GetPageMenuWithDeletedController
 */
class GetPageMenuWithDeletedController{
    /**
     * Crea una instancia del controlador
     * @param {Object} repository - Repositorio de menús asociados a la tienda
     */
    constructor(repository = new MenuTiendaRepository()){
        this.service = new GetPageMenuTiendaService(repository);
    }

    /**
     * Obtiene una página de registros de menús de la tienda en la base de datos inlcuidos los registros marcados como eliminados.
     * @param {Object} req - Objeto de solicitud HTTP.
     * @param {Object} res - Objeto de respuesta HTTP.
     * @returns {Promise<void>} - Devuelve una respuesta JSON con el resultado de la operación.
     */
    execute = async (req, res) => {
        try{
            const { pag = 1, limit = 10 } = req.params;
            const { rows , count, totPag } = await this.service.execute(pag, limit, false);
            res.json({data: {data: rows, totReg: count, rows: rows.length, pag: parseInt(pag), totPag}});
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetPageMenuWithDeletedController;