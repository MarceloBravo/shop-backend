import createTipoDimensionesService from "../../services/tipoDimensiones/CreateTipoDimensionesService.js";
import { handleError } from "../../shared/functions.js";

const createTipoDimensionesController = async (req, res) => {
    try{        
        const result = await createTipoDimensionesService(req.body);
        res.json({data: result, mensaje: 'El registro ha sido creado exitosamente.'});
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default createTipoDimensionesController;