import getMarcaService from '../../services/marca/GetMarcaService.js';
import { handleError } from "../../shared/functions.js";

const getGeneroController = async (req, res) => {
    try{
        const { id } = req.params
        const data = await getMarcaService(id)
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getGeneroController;
