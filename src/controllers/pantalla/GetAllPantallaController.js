import GetAllPantallaService from '../../services/pantalla/GetAllPantallaService.js';
import { handleError } from "../../shared/functions.js";

const getAllPantallaController = async (req, res) => {
    try{
        const data = await GetAllPantallaService();
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllPantallaController;

