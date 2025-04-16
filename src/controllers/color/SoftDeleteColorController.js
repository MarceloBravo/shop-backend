import softDeleteColorService from "../../services/color/SoftDeleteColorService.js";
import { handleError } from "../../shared/functions.js";

const softDeleteColorController = async (req, res) => {
    try{
        const { id } = req.params;
        const  result  = await softDeleteColorService(id);
        res.json(result);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default softDeleteColorController;