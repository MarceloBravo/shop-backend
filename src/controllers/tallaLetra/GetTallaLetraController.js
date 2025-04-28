import getTallaLetraService from '../../services/tallaLetra/GetTallaLetraService.js';
import { handleError } from "../../shared/functions.js";

const getTallaLetraController = async (req, res) => {
    try{
        const { id } = req.params
        const data = await getTallaLetraService(id)
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getTallaLetraController;
