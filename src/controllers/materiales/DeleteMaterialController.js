import deleteMaterialService from '../../services/materiales/DeleteMaterialService.js';
import { handleError } from "../../shared/functions.js";

const deleteMaterialController = async (req, res) => {
    try{
        const {id, result } = await deleteMaterialService(req.params);
        const mensaje = result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente';  
        res.json({ id, code: result ? 200 : 500, mensaje });
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default deleteMaterialController;