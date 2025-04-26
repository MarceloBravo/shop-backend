import getMaterialService from '../../services/materiales/GetMaterialService.js';
import { handleError } from "../../shared/functions.js";

const getMaterialController = async (req, res) => {
    try{
        const { id } = req.params
        const data = await getMaterialService(id)
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getMaterialController;
