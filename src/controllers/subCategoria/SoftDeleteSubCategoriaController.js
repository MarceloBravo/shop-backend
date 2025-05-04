import softDeleteSubCategoriaService from "../../services/subCategoria/SoftDeleteSubCategoriaService.js";
import { handleError } from "../../shared/functions.js";

const softDeleteSubCategoriaController = async (req, res) => {
    try {
        try{
            const { id } = req.params;
            const  result  = await softDeleteSubCategoriaService(id);
            const resp = {code: result, mensaje : result === 200 ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente' };
            res.json(resp);
        }catch(e){
            res.status(500).json({error: e.message});
        }
    } catch (e) {
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default softDeleteSubCategoriaController;