import getMenuService from '../../services/menu/GetMenuService.js';
import { handleError } from "../../shared/functions.js";

const getMenuController = async (req, res) => {
    try{
        const { id } = req.params
        const data = await getMenuService(id)
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getMenuController;
