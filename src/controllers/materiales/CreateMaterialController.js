import createMaterialService from "../../services/materiales/CreateMaterialService.js";
import { handleError } from "../../shared/functions.js";

const createMaterialController = async (req, res) => {
    try{        
        const data = await createMaterialService(req.body);
        res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default createMaterialController;