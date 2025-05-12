import createMenuService from "../../services/menu/CreateMenuService.js";
import { handleError } from "../../shared/functions.js";

const createMenuController = async (req, res) => {
    try{        
        const data = await createMenuService(req.body);
        res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default createMenuController;