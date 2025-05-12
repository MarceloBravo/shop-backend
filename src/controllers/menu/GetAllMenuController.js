import GetAllMenuService from '../../services/menu/GetAllMenuService.js';
import { handleError } from "../../shared/functions.js";

const getAllMenuController = async (req, res) => {
    try{
        const data = await GetAllMenuService();
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllMenuController;

