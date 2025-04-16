import softDeleteCategoriaService from "../../services/Categoria/SoftDeleteCategoriaService";
import { handleError } from "../../shared/functions.js";

const softDeleteCategoriaController = async (req, res) => {
    try {
        try{
            const { id } = req.params;
            const  result  = await softDeleteCategoriaService(id);
            res.json(result);
        }catch(e){
            res.status(500).json({error: e.message});
        }
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default softDeleteCategoriaController;