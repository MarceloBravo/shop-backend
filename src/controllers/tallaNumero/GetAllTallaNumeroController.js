import GetAllTallaNumeroService from '../../services/tallaNumero/GetAllTallaNumeroService.js';
import { handleError } from "../../shared/functions.js";

const getAllTallaNumeroController = async (req, res) => {
    try{
        const data = await GetAllTallaNumeroService();
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllTallaNumeroController;

