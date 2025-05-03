import getAllGeneroService from '../../services/genero/GetAllGeneroService.js';
import { handleError } from "../../shared/functions.js";

const getAllGeneroController = async (req, res) => {
    try{
        const data = await getAllGeneroService();
        res.json(data);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default getAllGeneroController;

