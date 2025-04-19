import deleteColorService from '../../services/color/DeleteColorService.js';
import { handleError } from "../../shared/functions.js";

const deleteColorController = async (req, res) => {
    try{
        const {id, result } = await deleteColorService(req.params);
        const mensaje = result === 200 ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente';  
        res.json({ id, code: result, mensaje });
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default deleteColorController;