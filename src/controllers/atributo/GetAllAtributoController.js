import getAllAtributoService from '../../services/atributo/GetAllAtributoService.js';
import { handleError } from "../../shared/functions.js";

const getAllAtributoController = async (req, res) => {
    try{
        const data = await getAllAtributoService();
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllAtributoController;

