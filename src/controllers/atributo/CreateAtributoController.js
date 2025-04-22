import createAtributoService from "../../services/atributo/CreateAtributoService.js";
import { handleError } from "../../shared/functions.js";

const createAtributoController = async (req, res) => {
    try{        
        const data = await createAtributoService(req.body);
        res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default createAtributoController;