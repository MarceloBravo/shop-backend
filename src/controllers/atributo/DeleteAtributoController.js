import deleteAtributoService from '../../services/atributo/DeleteAtributoService.js';
import { handleError } from "../../shared/functions.js";

const deleteAtributoController = async (req, res) => {
    try{
        const {id, result } = await deleteAtributoService(req.params);
        const mensaje = result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente';  
        res.json({ id, code: result ? 200 : 500, mensaje });
    }catch(e){
        const err = handleError(e);
        res.status(err.code).json(err);
    }
}

export default deleteAtributoController;