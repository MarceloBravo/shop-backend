import deleteColorService from '../../services/color/DeleteColorService.js';
import { handleError } from "../../shared/functions.js";

const deleteColorController = async (req, res) => {
    try{
        const {id, result } = await deleteColorService(req.params);
        res.json({id, mensaje: result ? 'Registro eliminado exitosamente.' : 'El registro no púdo ser eliminado o registro inexistente'});
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default deleteColorController;