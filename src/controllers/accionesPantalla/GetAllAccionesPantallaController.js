import getAllAccionesPantallaService from '../../services/accionesPantalla/GetAllAccionesPantallaService.js';
import { handleError } from "../../shared/functions.js";

const getAllAccionesPantallaController = async (req, res) => {
    try{
        const data = await getAllAccionesPantallaService();
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllAccionesPantallaController;

