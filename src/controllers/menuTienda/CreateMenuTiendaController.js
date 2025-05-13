import createMenuTiendaService from "../../services/menuTienda/CreateMenuTiendaService.js";
import { handleError } from "../../shared/functions.js";

const createMenuTiendaController = async (req, res) => {
    try{        
        const data = await createMenuTiendaService(req.body);
        res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default createMenuTiendaController;