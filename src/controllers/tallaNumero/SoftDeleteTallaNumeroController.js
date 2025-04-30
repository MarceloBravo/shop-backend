import softDeleteTallaNumeroService from "../../services/tallaNumero/SoftDeleteTallaNumeroService.js";
import { handleError } from "../../shared/functions.js";

const softDeleteTallaNumeroController = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await softDeleteTallaNumeroService(id);
        const resp = {code: result, mensaje : result === 200 ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente' };
        res.json(resp);
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default softDeleteTallaNumeroController;