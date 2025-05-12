import getAccionesPantallaService from '../../services/accionesPantalla/GetAccionesPantallaService.js';
import { handleError } from "../../shared/functions.js";

const getAccionesPantallaController = async (req, res) => {
    try{
        const { id } = req.params
        const data = await getAccionesPantallaService(id)
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAccionesPantallaController;
