import createPantallaService from "../../services/pantalla/CreatePantallaService.js";
import { handleError } from "../../shared/functions.js";

const createPantallaController = async (req, res) => {
    try{        
        const data = await createPantallaService(req.body);
        res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default createPantallaController;