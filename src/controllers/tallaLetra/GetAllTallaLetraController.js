import GetAllTallaLetraService from '../../services/tallaLetra/GetAllTallaLetraService.js';
import { handleError } from "../../shared/functions.js";

const getAllTallaLetraController = async (req, res) => {
    try{
        const data = await GetAllTallaLetraService();
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllTallaLetraController;

