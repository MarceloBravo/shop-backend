import getAtributoService from '../../services/atributo/GetAtributoService.js';
import { handleError } from "../../shared/functions.js";

const getAtributoController = async (req, res) => {
    try{
        const { id } = req.params
        const data = await getAtributoService(id)
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAtributoController;
