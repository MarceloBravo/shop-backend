import getTallaNumeroService from '../../services/tallaNumero/GetTallaNumeroService.js';
import { handleError } from "../../shared/functions.js";

const getTallaNumeroController = async (req, res) => {
    try{
        const { id } = req.params
        const data = await getTallaNumeroService(id)
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getTallaNumeroController;
