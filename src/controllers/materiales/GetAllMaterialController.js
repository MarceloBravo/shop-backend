import GetAllMaterialService from '../../services/materiales/GetAllMaterialService.js';
import { handleError } from "../../shared/functions.js";

const getAllMaterialController = async (req, res) => {
    try{
        const data = await GetAllMaterialService();
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllMaterialController;

