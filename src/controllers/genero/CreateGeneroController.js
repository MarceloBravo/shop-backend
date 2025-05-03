import createGeneroService from "../../services/genero/CreateGeneroService.js";
import { handleError } from "../../shared/functions.js";

const createGeneroController = async (req, res) => {
    try{        
        const data = await createGeneroService(req.body);
        res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default createGeneroController;