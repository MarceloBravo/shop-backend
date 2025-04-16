import createColorService from "../../services/color/CreateColorService.js";
import { handleError } from "../../shared/functions.js";

const createColorController = async (req, res) => {
    try{        
        const data = await createColorService(req.body);
        res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default createColorController;