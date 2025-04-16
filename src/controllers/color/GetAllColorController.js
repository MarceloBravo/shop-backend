import GetAllColorService from '../../services/color/GetAllColorsService.js';
import { handleError } from "../../shared/functions.js";

const getAllColorController = async (req, res) => {
    try{
        const data = await GetAllColorService();
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllColorController;

