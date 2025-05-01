import GetAllTipoDimensionesService from '../../services/tipoDimensiones/GetAllTipoDimensionesService.js';
import { handleError } from "../../shared/functions.js";

const getAllTipoDimensionesController = async (req, res) => {
    try{
        const data = await GetAllTipoDimensionesService();
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllTipoDimensionesController;

