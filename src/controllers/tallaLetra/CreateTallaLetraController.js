import createTallaLetraService from "../../services/tallaLetra/CreateTallaLetraService.js";
import { handleError } from "../../shared/functions.js";

const createTallaLetraController = async (req, res) => {
    try{        
        const data = await createTallaLetraService(req.body);
        res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default createTallaLetraController;