import createAccionesPantallaService from "../../services/accionesPantalla/CreateAccionesPantallaService.js";
import { handleError } from "../../shared/functions.js";

const createAccionesPantallaController = async (req, res) => {
    try{        
        const data = await createAccionesPantallaService(req.body);
        res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default createAccionesPantallaController;