import softDeleteRolService from "../../services/Rol/SoftDeleteRolService.js";
import { handleError } from "../../shared/functions.js";

const softDeleteRolController = async (req, res) => {
    try {
        try{
            const { id } = req.params;
            const  result  = await softDeleteRolService(id);
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

export default softDeleteRolController;