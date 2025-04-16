import getColorService from '../../services/color/GetColorService.js';
import { handleError } from "../../shared/functions.js";

const getColorController = async (req, res) => {
    try{
        const { id } = req.params
        const data = await getColorService(id)
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getColorController;
