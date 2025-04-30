import createTallaNumeroService from "../../services/tallaNumero/CreateTallaNumeroService.js";
import { handleError } from "../../shared/functions.js";

const createTallaNumeroController = async (req, res) => {
    try{        
        const data = await createTallaNumeroService(req.body);
        res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default createTallaNumeroController;